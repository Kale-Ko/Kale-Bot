const fs = require("fs")
var { client, commands, stats } = require("../bot.js")
var { data } = require("./data.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "commands",
    description: "Adds commands to your server",
    events: ["register", "messageCreate"],
    run: (name, message) => {
        if (name == "register") {
            var existingcommands = new Map()
            var reggisteredcommands = []

            client.application.commands.fetch().then(res => {
                res.forEach(command => { existingcommands.set(command.name, command.id) })

                var categorylist = fs.readdirSync("./commands")

                categorylist.forEach(category => {
                    var commandlist = fs.readdirSync("./commands/" + category)

                    commandlist.forEach(file => {
                        if (file == "category.json") return

                        const command = require("../commands/" + category + "/" + file)

                        commands.push({ name: command.name, description: command.description, category, paramiters: command.paramiters, requiredPermissions: command.requiredPermissions, worksInDms: command.worksInDms, run: command.callback })

                        if (command.worksInDms) {
                            reggisteredcommands.push(command.name)

                            var options = []

                            command.paramiters.forEach(paramiter => {
                                if (paramiter.type != "paramiter") return

                                var type = 3

                                if (paramiter.type == "number") type = 4
                                if (paramiter.type == "boolean") type = 5
                                if (paramiter.type == "user") type = 6
                                if (paramiter.type == "channel") type = 7
                                if (paramiter.type == "role") type = 8
                                if (paramiter.type == "double") type = 10

                                options.push({ name: paramiter.name, description: paramiter.description, type, required: !paramiter.optional })
                            })

                            if (!existingcommands.has(command.name)) client.application.commands.create({ name: command.name, description: command.description, options })
                            client.application.commands.edit(existingcommands.get(command.name), { name: command.name, description: command.description, options })
                        }
                    })
                })

                client.application.commands.fetch().then(res => { res.forEach(command => { if (!reggisteredcommands.includes(command.name)) client.api.applications(client.user.id).commands(command.id).delete() }) })

                client.ws.on("INTERACTION_CREATE", interaction => {
                    var command = interaction.data.name.toLowerCase()
                    var options = interaction.data.options || []
                    var args = []

                    options.forEach(option => { args.push(option.value) })

                    var message = {}
                    message.author = interaction.member.user
                    message.guild = client.guilds.cache.get(interaction.guild_id)
                    message.channel = message.guild.channels.cache.get(interaction.channel_id)

                    if (message.channel.type != "DM") var config = data.configs[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

                    message.content = config.prefix + command + " " + args.join(" ")

                    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 5, data: { content: "Running!" } } })

                    module.exports.runCommand(message, config)

                    client.api.webhooks(client.application.id, interaction.token).messages["@original"].patch({ data: { content: "Ran!" } })
                })

                console.log("Commands > Loaded " + commands.length + (commands.length == 1 ? " command." : " commands."))
            })
        } else {
            if (message.channel.type != "DM") var config = data.configs[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

            if (!message.author.bot && (message.content.startsWith(config.prefix) || message.content.startsWith("<@" + client.user.id + ">") || message.content.startsWith("<@!" + client.user.id + ">"))) module.exports.runCommand(message, config)
        }
    },
    runCommand: (message, config) => {
        var data = (message.content.toLowerCase().startsWith("<@") ? message.content.toLowerCase().replace("<@" + client.user.id + "> ", "").replace("<@!" + client.user.id + "> ", "").replace("<@" + client.user.id + ">", "").replace("<@!" + client.user.id + ">", "") : message.content.toLowerCase().replace(config.prefix, ""))

        var name = data.split(" ")[0]
        var args = data.split(" "); args.shift()

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

                            args.splice(index3, 1)
                        }

                        index3++
                    })

                    var index4 = 0

                    string.split('" "').forEach(string => {
                        args[index + index4] = string.replace(/"/ig, "")

                        index4++
                    })
                }
            }

            index++
        })

        var command = { name, args }

        var index = 0

        var ran = false
        commands.forEach(customCommand => {
            if (!customCommand.worksInDms && message.channel.type == "DM") return

            if (customCommand.name == command.name) {
                var hasPerms = true
                var failedPerm = ""

                customCommand.requiredPermissions.forEach(permission => {
                    if (!message.guild.members.cache.get(message.author.id).permissions.has(permission, { checkAdmin: true, checkOwner: true })) {
                        hasPerms = false
                        failedPerm = permission
                    }
                })

                var neededargs = []

                customCommand.paramiters.forEach(paramiter => {
                    if (paramiter.type != "paramiter") return

                    if (paramiter.optional == false) neededargs.push(paramiter.name)
                })

                if (command.args.length < neededargs.length) {
                    message.content = config.prefix + "help " + customCommand.name

                    module.exports.runCommand(message, config)

                    ran = true

                    return
                }

                if (config.features[JSON.parse(fs.readFileSync("./commands/" + customCommand.category + "/category.json")).feature] == false) return

                if (hasPerms) customCommand.run(message, command.args, client, config); else sendEmbed(message.channel, message.author, config, "Denied", "You need to have the permission " + failedPerm + " to use that command")

                ran = true
            }
        })

        if (!ran) {
            if (message.channel.type != "DM") sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command, use " + config.prefix + "help for a list of commands")
            else sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command or you cant use that command in dms, use " + config.prefix + "help for a list of commands")
        } else {
            stats.commands++

            setTimeout(() => { stats.commands-- }, 60000)
        }
    }
}