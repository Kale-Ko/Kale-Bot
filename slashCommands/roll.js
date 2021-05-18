const { createEmbed } = require("../util.js")

module.exports = {
    name: "roll",
    description: "Roll a die",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Dice roll", Math.floor(Math.random() * 6))
    }
}