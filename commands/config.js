const { sendEmbed } = require("../util.js")
const { runCommand } = require("../features/commands.js")

module.exports = {
    name: "config",
    description: "Get info about the bot",
    category: "Management",
    paramiters: "(Get, Set) {Key} {Value (Set)}",
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        if (args[0] == "get") {
            var helpText = ""
            
            for (var key of Object.keys(config)) {
                var helpText += key + " - " + config[key]
            }
            
            sendEmbed(message.channel, message.author, config, "Config", helpText)
        } else if (args[0] == "set") {
            
        } else {
            var newMessage = message
            newMessage.content = config.prefix + "help " + module.exports.name
            runCommand(newMessage, config)
        }
    }
}
