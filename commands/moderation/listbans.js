const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listbans",
    description: "List all server bans",
    paramiters: [],
    requiredPermissions: ["BAN_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var bans = ""

        message.guild.fetchBans().then(banlist => {
            banlist.forEach(ban => {
                bans += ban.user.username + " - " + ban.reason + "\n"
            })

            sendEmbed(message.channel, message.author, config, "Bans", bans)
        })
    }
}