const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "ping",
    description: "Ping the bot",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Pong!", "Bot ping " + client.ws.ping + "ms")
    }
}