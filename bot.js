const fs = require("fs")
var env = {}
if (fs.existsSync("./env.json")) env = require("./env.json")
const Discord = require("discord.js")
const client = new Discord.Client()

var config = {}
var features = []
var commands = []

if (process.env.WEBPAGEONLY == "true" || process.env.WEBPAGEONLY == true) {
    require("./features/webpage.js").run()

    return
}

fs.readFile("./config.json", "utf8", (err, newConfig) => {
    config = JSON.parse(newConfig)

    require("./features/data.js").run("preregister", () => {
        client.on("ready", () => {
            console.log("Bot Logged in as " + client.user.tag)

            registerFeatures()
        })

        client.login(process.env.KALEBOTTOKEN || env.BOTTOKEN)

        function registerFeatures() {
            var featureList = fs.readdirSync("./features")

            featureList.forEach(file => {
                if (!file.endsWith(".js")) return

                const feature = require("./features/" + file)

                features.push({ name: feature.name, description: feature.description, events: feature.events, run: feature.run })

                feature.events.forEach(event => {
                    if (event == "register") {
                        feature.run(event, "")
                    } else {
                        client.on(event, data => {
                            feature.run(event, data)
                        })
                    }
                })
            })

            console.log("Features > Loaded " + features.length + (features.length == 1 ? " feature." : " features."))
        }

        module.exports = { client, config, features, commands }
    })
})