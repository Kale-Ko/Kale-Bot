const { createEmbed } = require("../util.js")

module.exports = {
    name: "atsender",
    description: "Change whether it ats the sender of the message",
    testOnly: true,
    slash: true,
    hidden: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Error", "Please use ?atsender to set the at sender")
    }
}