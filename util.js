const Discord = require("discord.js")
const { uploadData, downloadData } = require("./features/data.js")

function sendEmbed(channel, author, config, title, description, thumbnail) {
    if (channel == null) return

    if (config.atsender) channel.send("<@" + author.id + ">\n", { embed: createEmbed(title, description, thumbnail) })
    else channel.send(createEmbed(title, description, thumbnail))
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

module.exports = { sendEmbed, createEmbed, uploadData, downloadData }