var { client, development, config } = require("../bot.js")
const fs = require("fs")
var env = {}
if (fs.existsSync("./env.json")) env = require("../env.json")
const firebaseAdmin = require("firebase-admin")
var firebaseApp
var storage

if (!development) {
    firebaseApp = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert((process.env.KALEBOTFIREBASECERT || JSON.stringify(env.KALEBOTFIREBASECERT)).startsWith("{") ? JSON.parse(process.env.KALEBOTFIREBASECERT || JSON.stringify(env.KALEBOTFIREBASECERT)) : JSON.parse(fs.readFileSync(process.env.KALEBOTFIREBASECERT))),
        databaseURL: process.env.KALEBOTFIREBASEDATABASE
    })

    storage = firebaseAdmin.storage(firebaseApp).bucket("gs://kale-bot-discord.appspot.com")
}

var data = {}

module.exports = {
    name: "data",
    description: "Configurate a server with custom options and save data",
    events: ["register", "guildCreate", "guildDelete"],
    run: (name, guild) => {
        if (name == "preregister") {
            module.exports.downloadData(newdata => {
                data = newdata

                module.exports.data = data

                guild(data)
            })
        } else if (name == "register") {
            client.guilds.cache.forEach(guild => { module.exports.fixConfig(guild) })

            setInterval(() => { module.exports.uploadData() }, 15000);
        } else if (name == "guildCreate") {
            module.exports.fixConfig(guild)
        } else if (name == "guildDelete") {
            delete data.configs[guild.id]
            delete data.logs[guild.id]
        }
    },
    data,
    uploadData: () => {
        if (!development) {
            for (var key in data.configs) { storage.file("data/" + key + "/config.json").save(JSON.stringify(data.configs[key], null, 4)) }
            for (var key in data.logs) { storage.file("data/" + key + "/log.json").save(JSON.stringify(data.logs[key], null, 4)) }
        } else {
            fs.writeFileSync("./data.json", JSON.stringify(data, null, 4))
        }
    },
    downloadData: (callback) => {
        if (!development) {
            var newdata = { configs: {}, logs: {} }

            client.guilds.cache.forEach(guild => {
                console.log(guild.id, guild.name)

                storage.file("data/" + guild.id + "/config.json").download().then(newConfig => { newdata.configs[guild.id] = newConfig })
                storage.file("data/" + guild.id + "/log.json").download().then(newLog => { newdata.logs[guild.id] = newLog })
            })

            callback(newdata)
        } else {
            callback(JSON.parse(fs.readFileSync("./data.json")))
        }
    },
    fixConfig: (guild) => {
        if (data.configs[guild.id] == undefined || data.configs[guild.id] == null) data.configs[guild.id] = config.defaultConfig
        if (data.logs[guild.id] == undefined || data.logs[guild.id] == null) data.logs[guild.id] = config.defaultLogs

        data.configs[guild.id].name = guild.name

        var serverconfig = data.configs[guild.id]
        var logs = data.logs[guild.id]

        function fix(data, expected) {
            for (var key of Object.keys(expected)) {
                if (!JSON.stringify(expected[key]).startsWith("{")) {
                    if (data[key] == null || data[key] == undefined) data[key] = expected[key]
                } else {
                    if (data[key] == null || data[key] == undefined) data[key] = expected[key]

                    data[key] = fix(data[key], expected[key])
                }
            }

            return data
        }
        serverconfig = fix(serverconfig, config.defaultConfig)
        logs = fix(logs, config.defaultLogs)

        data.configs[guild.id] = serverconfig
        data.logs[guild.id] = logs
    }
}