var { sendEmbed, data } = require("../bot.js")

module.exports = {
    name: "help",
    description: "Get help with the bot",
    requiredPermissions: [],
    worksInDms: true,
    callback: ({ message, args, client, config }) => {
        var help = "**Unranked**\nUse " + config.prefix + "help to show this\nUse " + config.prefix + "about to get info about the bot\nUse " + config.prefix + "uptime to get how long the bot has been online"
        if (message.channel.type != "dm") help += "\n\n**Admins**\nUse " + config.prefix + "clear to clear a channels messages\nUse " + config.prefix + "prefix to set the prefix\nUse " + config.prefix + "deletetimeout to set the delete timeout\nUse " + config.prefix + "atsender to change whether it ats the sender of the message"

        sendEmbed(message.channel, message.author, config, "Help", help)
    }
}