var { commands } = require("../bot.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "help",
    description: "Get help with the bot",
    category: "Info",
    paramiters: "",
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        var help = {}

        commands.forEach(command => {
            if (!command.worksInDms) {
                if (help[command.category] == null) help[command.category] = []

                help[command.category].push("\n" + config.prefix + command.name + (command.paramiters != null ? " " + command.paramiters : "") + " - " + command.description)
            } else {
                if (message.channel.type != "dm") {
                    if (help[command.category] == null) help[command.category] = []

                    help[command.category].push("\n" + config.prefix + command.name + " - " + command.description)
                }
            }
        })

        var helpString = ""

        for (var key of Object.keys(help)) {
            helpString += "\n\n**" + key + "**"

            help[key].forEach(string => {
                helpString += string
            })
        }

        sendEmbed(message.channel, message.author, config, "Help", helpString)
    }
}