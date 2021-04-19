const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

var data = {}

fs.stat("./data.json", function (err, stats) {
    if (err) return

    fs.readFile("./data.json", "utf8", (err, newData) => {
        data = JSON.parse(newData)

        data.lastDowntimeReason = "a crash"

        fs.writeFileSync("./data.json", JSON.stringify(data, null, 4))

        client.on('ready', () => {
            console.log("Bot Logged in as " + client.user.tag)

            client.user.setActivity(data.status, { type: "PLAYING" })
        })

        client.on('message', message => {
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
                if (message.author.bot) {
                    setTimeout(() => {
                        if (!message.deleted) message.delete()
                    }, config.deleteTimeout * 1000)
                }
            }
        })

        client.on('guildCreate', guild => {
            data.servers[guild.id] = data.defaultConfig
        })

        client.login(process.env.KALEBOTTOKEN)

        function sendEmbed(channel, author, config, title, description, thumbnail) {
            const embed = new Discord.MessageEmbed()
            embed.setColor(0xffaa00)
            embed.setAuthor(client.user.username, client.user.displayAvatarURL())
            embed.setTitle(title)
            embed.setDescription(description)
            embed.setThumbnail(thumbnail)
            embed.setFooter(client.user.username)
            embed.setTimestamp(new Date())

            if (config.atSender && author != undefined) {
                channel.send("<@" + author.id + ">\n", { "embed": embed })
            } else {
                channel.send(embed)
            }
        }

        function handleCommand(message, config) {
            var command = message.content.toLowerCase().split(" ")[0].replace(config.prefix, "")
            var args = message.content.toLowerCase().split(" "); args.shift()

            if (command == "help") {
                var help = "**Unranked**\nUse " + config.prefix + "help to show this\nUse " + config.prefix + "about to get info about the bot\nUse " + config.prefix + "uptime to get how long the bot has been online"
                if (message.channel.type != "dm") help += "\n\n**Admins**\nUse " + config.prefix + "clear to clear a channels messages\nUse " + config.prefix + "prefix to set the prefix\nUse " + config.prefix + "deletetimeout to set the delete timeout\nUse " + config.prefix + "atsender to change whether it ats the sender of the message"

                sendEmbed(message.channel, message.author, config, "Help", help)
            } else if (command == "about") {
                sendEmbed(message.channel, message.author, config, "About", "Kale bot is a miscellaneous Discord bot made by <@622242352433725451>")
            } else if (command == "uptime") {
                var difference = Math.abs(new Date() - client.readyTimestamp)
                var differentDays = Math.ceil(difference / (1000 * 60 * 60 * 24) - 1)
                var differentHours = Math.ceil(difference / (1000 * 60 * 60) - 1) - (differentDays * 24)
                var differentMinutes = Math.ceil(difference / (1000 * 60) - 1) - ((differentHours * 60) + (differentDays * 24 * 60))
                var differentSeconds = Math.ceil(difference / 1000 - 1) - ((differentMinutes * 60) + (differentHours * 60 * 60) + (differentDays * 24 * 60 * 60))

                sendEmbed(message.channel, message.author, config, "Uptime", "The bot has been online for " + differentDays + " days, " + differentHours + " hours, and " + differentMinutes + " minutes and " + differentSeconds + " seconds\nIt last went offline because of " + data.lastDowntimeReason)
            } else if (command == "clear" && message.channel.type != "dm") {
                if (message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
                    var amount = args[0]
                    if (amount == undefined || amount == null || amount == "") amount = 100

                    async function clear() {
                        const fetched = await message.channel.messages.fetch({ limit: amount })

                        message.channel.bulkDelete(fetched)
                    }

                    clear()
                } else {
                    sendEmbed(message.channel, message.author, config, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
                }
            } else if (command == "prefix" && message.channel.type != "dm") {
                if (message.member.hasPermission('MANAGE_SERVER', { checkAdmin: true, checkOwner: true })) {
                    if (args[0] == undefined || args[0] == "") { sendEmbed(message.channel, message.author, config, "Invalid", "That is not a valid prefix"); return }

                    config.prefix = args[0]

                    fs.writeFileSync("data.json", JSON.stringify(data, null, 4))

                    sendEmbed(message.channel, message.author, config, "Successfully set", "Successfully set the prefix to " + args[0])
                } else {
                    sendEmbed(message.channel, message.author, config, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
                }
            } else if (command == "deletetimeout" && message.channel.type != "dm") {
                if (message.member.hasPermission('MANAGE_SERVER', { checkAdmin: true, checkOwner: true })) {
                    if (args[0] == undefined || args[0] == "") { sendEmbed(message.channel, message.author, config, "Invalid", "That is not a valid amount"); return }

                    config.deleteTimeout = parseFloat(args[0])

                    fs.writeFileSync("data.json", JSON.stringify(data, null, 4))

                    sendEmbed(message.channel, message.author, config, "Successfully set", "Successfully set the delete timout to " + args[0])
                } else {
                    sendEmbed(message.channel, message.author, config, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
                }
            } else if (command == "atsender" && message.channel.type != "dm") {
                if (message.member.hasPermission('MANAGE_SERVER', { checkAdmin: true, checkOwner: true })) {
                    if (args[0] != "true" && args[0] != true && args[0] == "false" && args[0] == false) { sendEmbed(message.channel, message.author, config, "Invalid", "That is not a valid bollean"); return }

                    var value = true; if (args[0] == "false" || args[0] == false) value = false

                    config.atSender = value

                    fs.writeFileSync("data.json", JSON.stringify(data, null, 4))

                    sendEmbed(message.channel, message.author, config, "Successfully set", "Successfully set at sender to " + value)
                } else {
                    sendEmbed(message.channel, message.author, config, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
                }
            } else {
                sendEmbed(message.channel, message.author, config, "Unknown Command", "That is not a command, use " + config.prefix + "help for a list of commands")
            }
        }

        var exceptionOccurred = false
        process.on('SIGINT', function () { process.exit(0) })
        process.on('uncaughtException', function (err) {
            console.error(err)

            exceptionOccurred = true

            process.exit(0)
        })
        process.on('exit', function (code) {
            if (!exceptionOccurred) { data.lastDowntimeReason = "an intentional restart" } else { data.lastDowntimeReason = "a crash" }

            fs.writeFileSync("data.json", JSON.stringify(data, null, 4))
        })
    })
})