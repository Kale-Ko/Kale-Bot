const fs = require("fs")
const { data } = require("../../bot.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "unban",
    description: "Unban a person from the server",
    paramiters: [{ type: "paramiter", name: "user", optional: false }, { type: "paramiter", name: "reason", optional: true }],
    requiredPermissions: ["BAN_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.fetchBan(args[0].replace("<@!", "").replace(">", "")).then(ban => {
            if (ban == null || ban == undefined) sendEmbed(message.channel, message.author, config, "Error", "That user is not banned")
            
            message.guild.members.unban(ban.user)

            sendEmbed(message.channel, message.author, config, "Unbanned", "Successfully unbanned <@" + ban.user.id + "> for " + (args[1] || ""))

            //ban.user.send(createEmbed("Banned", "You have been unbanned in " + message.guild.name + " for " + (args[1] || ""))).then(() => {
                data.logs[message.guild.id].actions.push({ "type": "unban", "by": message.author.id, "against": ban.user.id, "for": args[1] || "" })

                fs.writeFileSync("./data.json", JSON.stringify(data, null, 4))
            //})
        }).catch(err => {
            if (err.code == 10026) { sendEmbed(message.channel, message.author, config, "Error", "That user is not banned") } else console.error(err)
        })
    }
}