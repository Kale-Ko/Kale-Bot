const { createEmbed } = require("../util.js")

module.exports = {
    name: "deletetimeout",
    description: "Set the delete timeout",
    testOnly: true,
    slash: true,
    hidden: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Error", "Please use ?deletetimeout to set the delete timeout")
    }
}