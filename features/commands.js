const fs = require("fs")
var { client, data, commands } = require("../bot.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "commands",
    description: "Adds commands to your server",
    events: ["register", "message"],
    run: (name, message) => {
        if (name == "register") {
            var categorylist = fs.readdirSync("./commands")
            
            categoryList.forEach(category => {
                var commandlist = fs.readdirSync("./commands/" + category)

                commandlist.forEach(file => {
                    const command = require("../commands/" + category + "/" + file)

                    commands.push({ name: command.name, description: command.description, category, paramiters: command.paramiters, requiredPermissions: command.requiredPermissions, worksInDms: command.worksInDms, run: command.callback })
                })
            })

            console.log("Commands > Loaded " + commands.length + (commands.length == 1 ? " command." : " commands."))
        } else {
            if (message.channel.type != "dm") var config = data.configs[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

            if (!message.author.bot && message.content.startsWith(config.prefix)) module.exports.runCommand(message, config)
        }
    },
    runCommand: (message, config) => {
        var command = message.content.toLowerCase().split(" ")[0].replace(config.prefix, "")
        var args = message.content.toLowerCase().split(" "); args.shift()

        var ran = false
        commands.forEach(customCommand => {
            if (!customCommand.worksInDms && message.channel.type == "dm") return

            if (customCommand.name == command) {
                var hasPerms = true
                var failedPerm = ""

                customCommand.requiredPermissions.forEach(permission => {
                    if (!message.guild.member(message.author).hasPermission(permission, { checkAdmin: true, checkOwner: true })) {
                        hasPerms = false
                        failedPerm = permission
                    }
                })

                if (hasPerms) customCommand.run(message, args, client, config); else sendEmbed(message.channel, message.author, config, "Denied", "You need to have the permission " + failedPerm + " to use that command")

                ran = true
            }
        })

        if (!ran) {
            if (message.channel.type != "dm") sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command, use " + config.prefix + "help for a list of commands")
            else sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command or you cant use that command in dms, use " + config.prefix + "help for a list of commands")
        }
    }
}