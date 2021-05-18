var { commands } = require("../bot.js")
const { createEmbed } = require("../util.js")

module.exports = {
    name: "help",
    description: "Get help",
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        var help = "**Unranked**"
        var admin = "\n\n**Admin**"

        commands.forEach(command => {
            if (!command.worksInDms) {
                if (JSON.stringify(command.requiredPermissions) == JSON.stringify([])) {
                    help += "\n/" + command.name + " - " + command.description
                } else {
                    admin += "\n/" + command.name + " - " + command.description
                }
            } else {
                if (channel.type != "dm") {
                    if (JSON.stringify(command.requiredPermissions) == JSON.stringify([])) {
                        help += "\n/" + command.name + " - " + command.description
                    } else {
                        admin += "\n/" + command.name + " - " + command.description
                    }
                }
            }
        })

        return createEmbed("Help", help + admin)
    }
}