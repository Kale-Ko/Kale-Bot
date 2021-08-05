const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "privacy",
    description: "Get the privacy pollicy for the bot",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Privacy Pollicy", "https://kalebot.ga/privacy")
    }
}