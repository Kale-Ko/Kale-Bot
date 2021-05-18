const fs = require("fs")
const Discord = require("discord.js")
const client = new Discord.Client()
const { sendEmbed, createEmbed } = require("./util.js")

var data = {}
var features = []
var commands = []

fs.readFile("./data.json", "utf8", (err, newData) => {
    data = JSON.parse(newData)

    client.on("ready", () => {
        console.log("Bot Logged in as " + client.user.tag)

        client.user.setPresence({ status: 'online', activity: { name: data.status, type: "WATCHING" } })

        registerFeatures()
    })

    client.login(process.env.KALEBOTTOKEN)

    function registerFeatures() {
        var featureList = fs.readdirSync("./features")

        var featureCount = 0
        featureList.forEach(file => {
            const feature = require("./features/" + file)

            features.push({ name: feature.name, description: feature.description, required: feature.required, events: feature.events, run: feature.run })

            feature.events.forEach(event => {
                if (event == "register") {
                    feature.run(event, "")
                } else {
                    client.on(event, data => {
                        feature.run(event, data)
                    })
                }
            })

            featureCount++
        })

        console.log("CustomFeatures > Loaded " + featureCount + (commands.length == 1 ? " feature." : " features."))
    }
})

module.exports = { createEmbed, sendEmbed, data, client, features, commands }