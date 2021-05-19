const { sendEmbed } = require("../util.js")

module.exports = {
    name: "roll",
    description: "Roll a die",
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Dice roll", Math.floor(Math.random() * 6))
    }
}