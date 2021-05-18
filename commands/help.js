var { sendEmbed, data, commands } = require("../bot.js")

module.exports = {
    name: "help",
    description: "Get help with the bot",
    requiredPermissions: [],
    worksInDms: true,
    callback: ({ message, args, client, config }) => {
        var help = "**Unranked**"
        var admin = "\n\n**Admin**"

        commands.forEach(command => {
            if (!command.worksInDms) {
                if (JSON.stringify(command.requiredPermissions) == JSON.stringify([])) {
                    help += "\n" + config.prefix + command.name + " - " + command.description
                } else {
                    admin += "\n" + config.prefix + command.name + " - " + command.description
                }
            } else {
                if (message.channel.type != "dm") {
                    if (JSON.stringify(command.requiredPermissions) == JSON.stringify([])) {
                        help += "\n" + config.prefix + command.name + " - " + command.description
                    } else {
                        admin += "\n" + config.prefix + command.name + " - " + command.description
                    }
                }
            }
        })

        sendEmbed(message.channel, message.author, config, "Help", help + admin)
    }
}