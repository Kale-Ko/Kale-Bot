var { createEmbed, data } = require("../bot.js")

module.exports = {
    name: "flip",
    description: "Flip a coin",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Coin Flip", Math.floor(Math.random() * 2) == 1 ? "Heads" : "Tails")
    }
}