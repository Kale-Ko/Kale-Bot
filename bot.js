const Discord = require('discord.js')
const client = new Discord.Client()

var prefix = "?"
var status = prefix + "help for help"

client.on('ready', () => {
    console.log("Bot Logged in as " + client.user.tag)

    client.user.setActivity(status, { type: "PLAYING" })
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
    if (message.content.startsWith(prefix + "about")) {
        sendEmbed(message.channel, "About", "Kale bot is a miscellaneous Discord bot made by Kale Ko#8048", "")
    } else if (message.content.startsWith(prefix + "help")) {
        sendEmbed(message.channel, "Help", "**Unranked**\nUse " + prefix + "help to show this\nUse " + prefix + "about to get info about the bot\n\n**Admins**\nUse " + prefix + "clear to clear a channels messages", "")
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