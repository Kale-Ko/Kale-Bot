var { sendEmbed, data } = require("../bot.js")

module.exports = {
    name: "ping",
    description: "Ping the bot",
    requiredPermissions: [],
    worksInDms: true,
    callback: ({ message, args, client, config }) => {
        sendEmbed(message.channel, message.author, config, "Pong!")
    }
}