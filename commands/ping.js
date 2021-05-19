const { sendEmbed } = require("../util.js")

module.exports = {
    name: "ping",
    description: "Ping the bot",
    category: "Info",
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Pong!", "")
    }
}