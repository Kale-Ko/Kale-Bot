const fs = require("fs")
const { sendEmbed } = require("../util.js")
const { runCommand } = require("../features/commands.js")

module.exports = {
    name: "config",
    description: "Get info about the bot",
    category: "Management",
    paramiters: "(Get, Set) {Key (Set)} {Value (Set)}",
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        if (args[0] == "get") {
            var helpText = ""

            function decode(parent, indent) {
                for (var key of Object.keys(parent)) {
                    if (parent[key] == "[object Object]") { helpText += indent + key + ":\n"; decode(parent[key], indent + "  "); continue }

                    helpText += indent + key + " - " + parent[key] + "\n"
                }
            }
            decode(config, "")

            helpText = helpText.replace(/, /ig, ",").replace(/,/ig, ", ")

            sendEmbed(message.channel, message.author, config, "Config", helpText)
        } else if (args[0] == "set") {
            if (args.length < 3) { var newMessage = message; newMessage.content = config.prefix + "help " + module.exports.name; runCommand(newMessage, config); return }

            var keys = args[1].split(".")
            var value = args[2]

            //fs.writeFileSync("../config.json", JSON.stringify(config, null, 4))

            //sendEmbed(message.channel, message.author, config, "Config", "Succsefuly set " + args[1] + " to " + args[2])
        } else {
            var newMessage = message
            newMessage.content = config.prefix + "help " + module.exports.name
            runCommand(newMessage, config)
        }
    }
}
