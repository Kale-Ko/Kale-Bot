const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "serverinfo",
    description: "Get info about a server",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "Server info", "**Name:** " + message.guild.name + "\n**Id:** " + message.guild.id + "\n**Created at:** " + new Date(message.guild.createdAt) + "\n**Owner:** <@" + message.guild.ownerId + ">\n**Users:** " + message.guild.memberCount + "\n**Boosts:** " + message.guild.premiumSubscriptionCount + "\n**Verified:** " + (message.guild.verified ? "yes" : "no"))
    }
}