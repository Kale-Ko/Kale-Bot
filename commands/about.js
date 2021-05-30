const { sendEmbed } = require("../util.js")

module.exports = {
    name: "about",
    description: "Get info about the bot",
    category: "Info",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "About", "Kale bot is a miscellaneous Discord bot made by <@622242352433725451>")
    }
}