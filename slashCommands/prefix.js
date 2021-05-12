var { createEmbed, data } = require("../bot.js")

module.exports = {
    name: "prefix",
    description: "Set the prefix",
    testOnly: true,
    slash: true,
    hidden: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Error", "Please use ?prefix to set the prefix")
    }
}