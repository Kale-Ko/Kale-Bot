const Discord = require("discord.js")
const { client } = require("./bot.js")
const { downloadData } = require("./features/data.js")

function sendEmbed(channel, author, config, title, description, thumbnail) {
    if (channel == null || !channel.permissionsFor(client.user).has("SEND_MESSAGES")) return

    if (config.atsender) channel.send({ content: "<@" + author.id + ">\n", embeds: [createEmbed(title, description, thumbnail)] })
    else channel.send({ embeds: [createEmbed(title, description, thumbnail)] })
}

function createEmbed(title, description, thumbnail) {
    const embed = new Discord.MessageEmbed()
    embed.setColor(0xffaa00)
    embed.setAuthor(require("./bot.js").client.user.username, require("./bot.js").client.user.displayAvatarURL())
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setThumbnail(thumbnail)
    embed.setFooter(require("./bot.js").client.user.username)
    embed.setTimestamp(new Date())

    return embed
}

module.exports = { sendEmbed, createEmbed, downloadData }