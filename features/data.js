var { client, config } = require("../bot.js")
const fs = require("fs")
var env = {}
fs.stat("./env.json", (err, stats) => { if (!err) env = require("./env.json") })

const firebase = require("firebase-admin")
const firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert((process.env.FIREBASECERT || JSON.stringify(env.FIREBASECERT)).startsWith("{") ? JSON.parse(process.env.FIREBASECERT || JSON.stringify(env.FIREBASECERT)) : JSON.parse(fs.readFileSync(process.env.FIREBASECERT))),
    databaseURL: "https://kale-bot-discord-default-rtdb.firebaseio.com"
})
const storage = firebase.storage(firebaseApp).bucket("gs://kale-bot-discord.appspot.com")

var data = {}

module.exports = {
    name: "data",
    description: "Configurate a server with custom options and save data",
    events: ["register", "guildCreate"],
    run: (name, guild) => {
        if (name == "preregister") {
            module.exports.downloadData(newdata => {
                data = newdata

                guild()
            })
        } else if (name == "register") {
            client.guilds.cache.forEach(guild => { fixConfig(guild) })
        } else {
            data.configs[guild.id] = config.defaultConfig
            data.logs[guild.id] = config.defaultLogs

            module.exports.uploadData()
        }
    },
    data,
    uploadData: () => { storage.file("data.json").save(JSON.stringify(require("./bot.js").data, null, 4)) },
    downloadData: (callback) => { storage.file("data.json").download().then(newData => { callback(JSON.parse(newData)) }).catch(err => { throw err }) }
}

function fixConfig(guild) {
    if (data.configs[guild.id] == null || data.configs[guild.id] == undefined) data.logs[guild.id] = config.defaultConfig
    if (data.logs[guild.id] == null || data.logs[guild.id] == undefined) data.logs[guild.id] = config.defaultLogs

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

    module.exports.uploadData()
}