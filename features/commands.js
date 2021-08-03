const fs = require("fs")
var { client, data, commands } = require("../bot.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "commands",
    description: "Adds commands to your server",
    events: ["register", "message"],
    run: (name, message) => {
        if (name == "register") {
            var existingcommands = []
            var reggisteredcommands = []

            client.api.applications(client.user.id).commands.get().then(res => {
                res.forEach(command => { existingcommands.push(command.name) })

                var categorylist = fs.readdirSync("./commands")

                categorylist.forEach(category => {
                    var commandlist = fs.readdirSync("./commands/" + category)

                    commandlist.forEach(file => {
                        if (file == "category.json") return

                        const command = require("../commands/" + category + "/" + file)

                        commands.push({ name: command.name, description: command.description, category, paramiters: command.paramiters, requiredPermissions: command.requiredPermissions, worksInDms: command.worksInDms, run: command.callback })

                        if (command.worksInDms) {
                            reggisteredcommands.push(command.name)

                            if (!existingcommands.includes(command.name)) client.api.applications(client.user.id).commands.post({ data: { name: command.name, description: command.description, options: [] } })
                        }
                    })
                })

                client.api.applications(client.user.id).commands.get().then(res => { res.forEach(command => { if (!reggisteredcommands.includes(command.name)) client.api.applications(client.user.id).commands(command.id).delete() }) })

                client.ws.on("INTERACTION_CREATE", interaction => {
                    var command = interaction.data.name.toLowerCase()
                    var options = interaction.data.options || []
                    var args = []

                    options.forEach(option => { args.push(option.value) })

                    var message = {} //{ author: interaction.member, guild: client.guilds.cache.get(interaction.guild_id), channel: message.guild.channels.cache.get(interaction.channel_id) }
                    message.author = interaction.member.user
                    message.guild = client.guilds.cache.get(interaction.guild_id)
                    message.channel = message.guild.channels.cache.get(interaction.channel_id)

                    if (message.channel.type != "dm") var config = data.configs[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

                    message.content = config.prefix + command + " " + args.join(" ")

                    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 5, data: { content: "Running!" } } })

                    module.exports.runCommand(message, config)

                    client.fetchApplication().then(application => { client.api.webhooks(application.id, interaction.token).messages["@original"].patch({ data: { content: "Ran!" } }) })
                })

                console.log("Commands > Loaded " + commands.length + (commands.length == 1 ? " command." : " commands."))
            })
        } else {
            if (message.channel.type != "dm") var config = data.configs[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

            if (!message.author.bot && message.content.startsWith(config.prefix)) module.exports.runCommand(message, config)
        }
    },
    runCommand: (message, config) => {
        var command = message.content.toLowerCase().split(" ")[0].replace(config.prefix, "")
        var args = message.content.toLowerCase().split(" "); args.shift()

        var index = 0

        args.forEach(arg => {
            if (arg.startsWith('"')) {
                var end = -1

                args.forEach(arg2 => {
                    var index2 = args.indexOf(arg2)

                    if (arg2.includes('"')) end = index2
                })

                if (end != -1) {
                    var string = ""
                    var index3 = 0

                    args.forEach(arg3 => {
                        if (index3 >= index && index3 <= end) {
                            string += arg3 + " "

                            delete args[index3]
                        }

                        index3++
                    })

                    var index4 = 0

                    string.split('" "').forEach(string => {
                        args[index + index4] = string.replace(/"/ig, "")

                        index4++
                    })
                } else {
                    sendEmbed(message.channel, message.author, config, "Error", "Error parsing command")
                }
            }

            index++
        })

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