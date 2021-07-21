const fs = require("fs")
var { commands } = require("../../bot.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "help",
    description: "Get help with the bot",
    paramiters: [{ type: "paramiter", name: "command", optional: true }],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        var help = {}
        var commandParam = args[0]

        commands.forEach(command => {
            if (commandParam == undefined || commandParam == "") {
                if (!command.worksInDms) {
                    if (help[command.category] == null) help[command.category] = []

                    help = createCommands(command, help, config)
                } else {
                    if (message.channel.type != "dm") {
                        if (help[command.category] == null) help[command.category] = []

                        help = createCommands(command, help, config)
                    }
                }
            } else {
                if (commandParam == command.name) {
                    help[" "] = []

                    var paramiters = null

                    help[" "].push("\n**Name:** " + command.name.charAt(0).toUpperCase() + command.name.substr(1) + "\n**Description:** " + command.description + "\n**Usage:** " + config.prefix + command.name + (paramiters != null ? " " + paramiters : "") + "\n**Works In Dms:** " + command.worksInDms + "\n**Required Permissions:** " + (command.requiredPermissions == "" ? "None" : command.requiredPermissions))
                }
            }
        })

        var helpString = ""
        var sortLength = 0

        for (var key of Object.keys(help)) { sortLength++ }

        for (var sortIndex = 1; sortIndex < sortLength + 1; sortIndex++) {
            for (var key of Object.keys(help)) {
                if (key != " ") {
                    if (JSON.parse(fs.readFileSync("./commands/" + key + "/category.json")).position != sortIndex) continue

                    helpString += "\n\n**" + key.charAt(0).toUpperCase() + key.substr(1) + "**"
                }

                help[key].forEach(string => {
                    helpString += string
                })
            }
        }

        sendEmbed(message.channel, message.author, config, "Help", helpString)
    }
}

function createCommands(command, help, config) {
    var paramiters = ""
    //var subCommandMade = false

    command.paramiters.forEach(paramiter => {
        if (paramiter.type == "paramiter") {
            paramiters += " {" + paramiter.name + (paramiter.optional ? " (optional)" : "") + "}"
        } else if (paramiter.type == "subcommands") {
            var commands = ""

            paramiter.commands.forEach(subCommand => {
                commands += (commands == "" ? subCommand.name : ", " + subCommand.name)

                /*subCommandMade = true

                var commandsPeramiters = ""

                subCommand.paramiters.forEach(paramiter => {
                    if (paramiter.type == "paramiter") {
                        commandsPeramiters += " {" + paramiter.name + (paramiter.optional ? " (Optional)" : "") + "}"
                    }
                })

                help[command.category].push("\n" + config.prefix + command.name + " " + subCommand.name + " - " + subCommand.description)*/
            })

            paramiters += " (" + commands + ")"
        }
    })

    /*if (!subCommandMade)*/ help[command.category].push("\n" + config.prefix + command.name + paramiters + " - " + command.description)

    return help
}