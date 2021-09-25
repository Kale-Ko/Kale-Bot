const fs = require("fs")
var env = {}
if (fs.existsSync("./env.json")) env = require("./env.json")
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_BANS", "DIRECT_MESSAGES"] })

var development = process.env.KALEBOTDEV || process.env.DEV || env.DEV
var config = {}
var stats = { commands: 0 }
var features = []
var commands = []

if (process.env.WEBPAGEONLY == "true" || process.env.WEBPAGEONLY == true) {
    require("./features/webpage.js").run()

    return
}

fs.readFile("./config.json", "utf8", (err, newConfig) => {
    config = JSON.parse(newConfig)

    if (development) {
        config.status = "for !help"
        config.defaultConfig.prefix = "!"
    }

    module.exports = { client, development, config, stats }

    client.on("ready", () => {
        require("./features/data.js").run("preregister", data => {
            console.log("Bot Logged in as " + client.user.tag)

            module.exports = { client, development, config, stats, features, commands }

            registerFeatures()
        })
    })

    client.login(process.env.KALEBOTTOKEN || env.BOTTOKEN)

    function registerFeatures() {
        var featureList = fs.readdirSync("./features")

        featureList.forEach(file => {
            if (!file.endsWith(".js")) return

            const feature = require("./features/" + file)

            features.push(feature)

            feature.events.forEach(event => {
                if (event == "register") feature.run(event, "", "")
                else client.on(event, (data, extradata) => { feature.run(event, data, extradata) })
            })
        })

        console.log("Features > Loaded " + features.length + (features.length == 1 ? " feature." : " features."))
    }
})