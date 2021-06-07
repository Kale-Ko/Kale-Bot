const fs = require("fs")
const Discord = require("discord.js")
const { downloadData } = require("./util")
const client = new Discord.Client()

var config = {}
var data = {}
var features = []
var commands = []

fs.readFile("./config.json", "utf8", (err, newData) => {
    config = JSON.parse(newData)

    data = downloadData()

    client.on("ready", () => {
        console.log("Bot Logged in as " + client.user.tag)

        registerFeatures()
    })

    client.login(process.env.KALEBOTTOKEN)

    function registerFeatures() {
        var featureList = fs.readdirSync("./features")

        featureList.forEach(file => {
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

    module.exports = { client, config, data, features, commands }
})