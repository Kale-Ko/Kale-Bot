var { sendEmbed, data } = require("../bot.js")

module.exports = {
    name: "rps",
    description: "Play rock paper scissors",
    requiredPermissions: [],
    worksInDms: true,
    callback: ({ message, args, client, config }) => {
        sendEmbed(message.channel, message.author, config, "Rock Paper Scissors", "")
    }
}