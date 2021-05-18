const { createEmbed } = require("../util.js")

module.exports = {
    name: "serverinfo",
    description: "Get info about a server",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return createEmbed("Error", "Please use ?serveringo to get info about the server")
    }
}