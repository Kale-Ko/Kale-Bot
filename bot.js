const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

var prefix = "?"
var status = prefix + "help for help"

var data
var startTime = new Date()

client.on('ready', () => {
    console.log("Bot Logged in as " + client.user.tag)

    client.user.setActivity(status, { type: "PLAYING" })

    fs.stat("restarting.txt", function (err, stats) {
        if (err) return

        fs.readFile("restarting.txt", "utf8", (err, data) => {
            if (err) throw err

            client.channels.fetch(data).then(function (result) {
                sendEmbed(result, "Restart", "The bot has restarted", "")
            })

            fs.unlinkSync("restarting.txt")
        })
    })


    fs.stat("data.json", function (err, stats) {
        if (err) return

        fs.readFile("data.json", "utf8", (err, newData) => {
            data = JSON.parse(newData)

            newData = JSON.parse(newData)
            newData.lastDowntimeReason = "a crash"
            fs.writeFileSync("data.json", JSON.stringify(newData))
        })
    })
})

client.on("guildCreate", (guild) => {
    console.log("Joined server: " + guild.name)
})

client.on('message', message => {
    if (!message.author.bot && message.content.startsWith(prefix)) handleCommand(message)
})

client.login(process.env.KALEBOTTOKEN)

function sendEmbed(channel, title, description, thumbnail) {
    const embed = new Discord.MessageEmbed()
    embed.setColor(0xffaa00)
    embed.setAuthor(client.user.username, client.user.displayAvatarURL())
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setThumbnail(thumbnail)
    embed.setFooter(client.user.username)
    embed.setTimestamp(new Date())

    channel.send(embed)
}

function handleCommand(message) {
    if (message.content.startsWith(prefix + "help")) {
        sendEmbed(message.channel, "Help", "**Unranked**\nUse " + prefix + "help to show this\nUse " + prefix + "about to get info about the bot\nUse " + prefix + "uptime to get how long the bot has been online\n\n**Admins**\nUse " + prefix + "clear to clear a channels messages", "")
    } else if (message.content.startsWith(prefix + "about")) {
        sendEmbed(message.channel, "About", "Kale bot is a miscellaneous Discord bot made by Kale Ko#8048", "")
    } else if (message.content.startsWith(prefix + "uptime")) {
        var difference = Math.abs(new Date() - startTime)
        var differentDays = Math.ceil(difference / (1000 * 60 * 60 * 24) - 1)
        var differentHours = Math.ceil(difference / (1000 * 60 * 60) - 1) - differentDays * 24
        var differentMinutes = Math.ceil(difference / (1000 * 60) - 1) - differentHours * 60
        var differentSeconds = Math.ceil(difference / 1000 - 1) - differentMinutes * 60

        sendEmbed(message.channel, "Uptime", "The bot has been online for " + differentDays + " days, " + differentHours + " hours, and " + differentMinutes + " minutes and " + differentSeconds + " seconds\nIt last went offline because of " + data.lastDowntimeReason, "")
    } else if (message.content.startsWith(prefix + "restart")) {
        if (message.member.id != 622242352433725451) {
            sendEmbed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")

            return
        }

        fs.writeFileSync("restarting.txt", message.channel.id)

        data.lastDowntimeReason = "an intentional restart"
        fs.writeFileSync("data.json", JSON.stringify(data))

        sendEmbed(message.channel, "Restarting", "I'll be back in a moment", "")

        setTimeout(() => {
            restartSlashIntentionalCrash()
        }, 200)
    } else if (message.content.startsWith(prefix + "clear")) {
        if (message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
            async function clear() {
                message.delete()

                const fetched = await message.channel.messages.fetch({ limit: 100 })

                message.channel.bulkDelete(fetched)
            }
            clear()
        } else {
            sendEmbed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
        }
    } else {
        sendEmbed(message.channel, "Unknown Command", "That is not a command, use " + prefix + "help for a list of commands", "")
    }
}