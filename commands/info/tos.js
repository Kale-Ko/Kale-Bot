const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "tos",
    description: "Get the tos for the bot",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Terms Of Service", "https://kalebot.kaleko.ga/tos")
    }
}