const fs = require("fs")
var { sendEmbed, client, data, commands } = require("../bot.js")

module.exports = {
    name: "commands",
    description: "Adds commands to your server",
    required: true,
    events: ["register", "message"],
    run: (name, data) => {
        if (name == "register") {
            var commandlist = fs.readdirSync("./commands")

            var commandCount = 0
            commandlist.forEach(file => {
                const command = require("../commands/" + file)

                commands.push({ name: command.name, description: command.description, requiredPermissions: command.requiredPermissions, worksInDms: command.worksInDms, run: command.callback })

                commandCount++
            })

            console.log("CustomCommands > Loaded " + commandCount + (commands.length == 1 ? " command." : " commands."))
        } else {
            var message = data

            if (message.channel.type != "dm") var config = data.servers[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

            if (message.channel.name == "bot-commands") {
                if (!message.author.bot) {
                    if (!message.deleted) message.delete()
                } else {
                    setTimeout(() => {
                        if (!message.deleted) message.delete()
                    }, config.deleteTimeout * 1000)
                }
            } else {
                if (message.embeds[0] != null) { if (message.embeds[0].title == "Welcome" || message.embeds[0].title == "Poll") return }

                if (message.author.id == client.user.id) {
                    setTimeout(() => {
                        if (!message.deleted) message.delete()
                    }, config.deleteTimeout * 1000)
                }
            }

            if (message.embeds[0] != null) if (message.embeds[0].title == "Poll") {
                var args = message.content.toLowerCase().split(" "); args.shift()

                require("../commands/poll.js").addReactions({ message, args, client, config })
            }

            if (!message.author.bot && message.content.startsWith(config.prefix)) {
                var command = message.content.toLowerCase().split(" ")[0].replace(config.prefix, "")
                var args = message.content.toLowerCase().split(" "); args.shift()

                var ran = false
                commands.forEach(customCommand => {
                    if (!customCommand.worksInDms && message.channel.type == "dm") return

                    if (customCommand.name == command) {
                        customCommand.run({ message, args, client, config })

                        ran = true
                    }
                })

                if (!ran) {
                    if (message.channel.type != "dm") sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command, use " + config.prefix + "help for a list of commands")
                    else sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command or you cant use that command in dms, use " + config.prefix + "help for a list of commands")
                }
            }
        }
    }
}