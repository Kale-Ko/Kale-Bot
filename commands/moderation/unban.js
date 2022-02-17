const { data } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "unban",
    description: "Unban a person from the server",
    paramiters: [{ type: "paramiter", name: "user", description: "The user to unban", kind: "user", optional: false }, { type: "paramiter", name: "reason", description: "The reason for the unban", kind: "string", optional: true }],
    requiredPermissions: ["BAN_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.fetchBan(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(ban => {
            if (ban == null || ban == undefined) sendEmbed(message.channel, message.author, config, "Error", "That user is not banned")

            message.guild.members.unban(ban.user)

            sendEmbed(message.channel, message.author, config, "Unbanned", "Successfully unbanned <@" + ban.user.id + "> for " + (args[1] || ""))

            //ban.user.send(createEmbed("Banned", "You have been unbanned in " + message.guild.name + " for " + (args[1] || ""))).then(() => {})

            delete data.logs[message.guild.id].bans[ban.user.id]

            data.logs[message.guild.id].actions.push({ "type": "unban", "by": message.author.id, "against": ban.user.id, "for": args[1] || "" })
        }).catch(err => {
            if (err.code == 10026) { sendEmbed(message.channel, message.author, config, "Error", "That user is not banned") } else console.error(err)
        })
    }
}