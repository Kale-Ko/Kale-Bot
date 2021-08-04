const { sendEmbed } = require("../../util.js")
const { data, uploadData } = require("../../features/data.js")
const { runCommand } = require("../../features/commands.js")

module.exports = {
    name: "config",
    description: "Get and set config values",
    paramiters: [{ type: "subcommands", commands: [{ name: "get", description: "Get all the config values" }, { name: "set", description: "Set config values" }] }, { type: "paramiter", name: "key", optional: false }, { type: "paramiter", name: "value", optional: false }],
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

            var value = args[2]
            if (value == "true") value = true
            if (value == "false") value = false

            updateNestedValueOfObj(config, args[1], value)

            data.configs[message.guild.id] = config

            uploadData()

            sendEmbed(message.channel, message.author, config, "Config", "Successfully set " + args[1] + " to " + args[2])

            function updateNestedValueOfObj(data, string, value) {
                let tempObj = data
                var args = string.split(".")

                for (var index = 0; index < args.length - 1; index++) {
                    var element = args[index]

                    if (!tempObj[element]) tempObj[element] = {}

                    tempObj = tempObj[element]
                }

                if (!value) { return tempObj[args[args.length - 1]] }

                tempObj[args[args.length - 1]] = value
            }
        } else {
            var newMessage = message
            newMessage.content = config.prefix + "help " + module.exports.name
            runCommand(newMessage, config)
        }
    }
}
