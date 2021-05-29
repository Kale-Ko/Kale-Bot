const fs = require("fs")
var { client, data } = require("../bot.js")

module.exports = {
    name: "config",
    description: "Configurate a server with custom options",
    required: true,
    events: ["register", "guildCreate"],
    run: (name, guild) => {
        if (name == "register") {
            client.guilds.cache.forEach(guild => { fixConfig(guild) })
        } else data.servers[guild.id] = data.defaultConfig
    }
}

function fixConfig(guild) {
    var config = data.servers[guild.id]

    var expected = data.defaultConfig

    function fix(config, expected) {
        for (var key of Object.keys(expected)) {
            if (!JSON.stringify(expected[key]).startsWith("{")) {
                console.log(key, config[key])

                if (config[key] == null || config[key] == undefined) config[key] = expected[key]
            } else {
                if (config[key] == null || config[key] == undefined) config[key] = expected[key]

                console.log(config)

                config[key] = fix(config[key], expected[key])
            }
        }

        return config
    }
    config = fix(config, expected)

    data.servers[guild.id] = config

    fs.writeFileSync("./data.json", JSON.stringify(data, null, 4))
}