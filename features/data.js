const fs = require("fs")
var { client, data } = require("../bot.js")

module.exports = {
    name: "data",
    description: "Configurate a server with custom options and save data",
    events: ["register", "guildCreate"],
    run: (name, guild) => {
        if (name == "register") {
            client.guilds.cache.forEach(guild => { fixConfig(guild) })
        } else {
            data.configs[guild.id] = data.defaultConfig
            data.logs[guild.id] = data.defaultLogs
        }
    }
}

function fixConfig(guild) {
    var config = data.configs[guild.id]
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
    //config = fix(config, data.defaultConfig)
    logs = fix(logs, data.defaultLogs)

    data.configs[guild.id] = config
    data.logs[guild.id] = logs

    fs.writeFileSync("./data.json", JSON.stringify(data, null, 4))
}