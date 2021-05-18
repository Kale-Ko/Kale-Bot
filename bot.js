const fs = require("fs")
const Discord = require("discord.js")
const client = new Discord.Client()
const WOKCommands = require("wokcommands")

var data = {}
var commands = []

fs.stat("./data.json", function (err, stats) {
    if (err) return

    fs.readFile("./data.json", "utf8", (err, newData) => {
        data = JSON.parse(newData)

        client.on("ready", () => {
            console.log("Bot Logged in as " + client.user.tag)

            client.user.setPresence({ status: 'online', activity: { name: data.status, type: "WATCHING" } })

            new WOKCommands(client, { commandsDir: "slashCommands", testServers: ["787052330129686560"], showWarns: false, })

            registerCommands()
        })

        client.on("message", message => {
            if (message.channel.type != "dm") var config = data.servers[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

            if (!message.author.bot && message.content.startsWith(config.prefix)) handleCommand(message, config)

            if (message.channel.name == "bot-commands") {
                if (!message.author.bot) {
                    if (!message.deleted) message.delete()
                } else {
                    setTimeout(() => {
                        if (!message.deleted) message.delete()
                    }, config.deleteTimeout * 1000)
                }
            } else {
                if (message.author.id == client.user.id) {
                    setTimeout(() => {
                        if (!message.deleted) message.delete()
                    }, config.deleteTimeout * 1000)
                }
            }

            if (message.embeds[0] != null) if (message.embeds[0].title == "Poll") {
                var args = message.content.toLowerCase().split(" "); args.shift()

                require("./commands/poll.js").addReactions({ message, args, client, config })
            }
        })

        client.on("guildCreate", guild => {
            data.servers[guild.id] = data.defaultConfig
        })

        client.login(process.env.KALEBOTTOKEN)

        function sendEmbed(channel, author, config, title, description, thumbnail) {
            if (config.atSender && author != undefined) {
                channel.send("<@" + author.id + ">\n", { embed: createEmbed(title, description, thumbnail) })
            } else {
                channel.send(createEmbed(title, description, thumbnail))
            }
        }

        function createEmbed(title, description, thumbnail) {
            const embed = new Discord.MessageEmbed()
            embed.setColor(0xffaa00)
            embed.setAuthor(client.user.username, client.user.displayAvatarURL())
            embed.setTitle(title)
            embed.setDescription(description)
            embed.setThumbnail(thumbnail)
            embed.setFooter(client.user.username)
            embed.setTimestamp(new Date())

            return embed
        }

        function registerCommands() {
            var commandlist = fs.readdirSync("./commands")

            var commandCount = 0
            commandlist.forEach(file => {
                const command = require("./commands/" + file)

                commands.push({ name: command.name, description: command.description, requiredPermissions: command.requiredPermissions, worksInDms: command.worksInDms, run: command.callback })

                commandCount++
            })

            console.log("CustomCommands > Loaded " + commandCount + (commands.length == 1 ? " command." : " commands."))
        }

        function handleCommand(message, config) {
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

        var exceptionOccurred = false
        process.on("SIGINT", function () { process.exit(0) })
        process.on("uncaughtException", function (err) {
            console.error(err)

            exceptionOccurred = true

            process.exit(0)
        })
        process.on("exit", function (code) {
            if (!exceptionOccurred) { data.lastDowntimeReason = "an intentional restart" } else { data.lastDowntimeReason = "a crash" }

            fs.writeFileSync("data.json", JSON.stringify(data, null, 4))
        })

        module.exports = { createEmbed, sendEmbed, data, commands }
    })
})