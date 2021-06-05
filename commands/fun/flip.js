const { sendEmbed } = require("../util.js")

module.exports = {
    name: "flip",
    description: "Flip a coin",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Coin Flip", Math.floor(Math.random() * 2) == 1 ? "Heads" : "Tails")
    }
}