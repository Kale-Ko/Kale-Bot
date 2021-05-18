const { createEmbed } = require("../util.js")

module.exports = {
    name: "ping",
    description: "Ping Pong!",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Pong!", "Ping Pong")
    }
}