const Discord = require("discord.js")
var { client } = require("./bot.js")

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

module.exports = { sendEmbed, createEmbed }