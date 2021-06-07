var { client, config, data } = require("../bot.js")
const { uploadData } = require("../util.js")

module.exports = {
    name: "data",
    description: "Configurate a server with custom options and save data",
    events: ["register", "guildCreate"],
    run: (name, guild) => {
        if (name == "register") {
            client.guilds.cache.forEach(guild => { fixConfig(guild) })
        } else {
            data.configs[guild.id] = config.defaultConfig
            data.logs[guild.id] = config.defaultLogs

            uploadData()
        }
    }
}

function fixConfig(guild) {
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

    uploadData()
}