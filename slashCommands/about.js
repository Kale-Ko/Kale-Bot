const { createEmbed } = require("../util.js")

module.exports = {
    name: "about",
    description: "Get info about the bot",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("About", "Kale bot is a miscellaneous Discord bot made by <@622242352433725451>")
    }
}