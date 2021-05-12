var { createEmbed, data } = require("../bot.js")

module.exports = {
    name: "help",
    description: "Get help",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        var help = "**Unranked**\nUse /help to show this\nUse /about to get info about the bot\nUse /uptime to get how long the bot has been online"
        if (message.channel.type != "dm") help += "\n\n**Admins**\nUse /clear to clear a channels messages\nUse /prefix to set the prefix\nUse /deletetimeout to set the delete timeout\nUse /atsender to change whether it ats the sender of the message"

        return createEmbed("Help", help)
    }
}