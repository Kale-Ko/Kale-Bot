const { data } = require("../../features/data.js")
const { sendEmbed, createEmbed } = require("../../util.js")

module.exports = {
    name: "ban",
    description: "Ban a person from the server",
    paramiters: [{ type: "paramiter", name: "user", description: "The user to ban", kind: "user", optional: false }, { type: "paramiter", name: "reason", description: "The reason for the ban", kind: "string", optional: true }],
    requiredPermissions: ["BAN_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            user.send(createEmbed("Banned", "You have been banned in " + user.guild.name + " for " + (args[1] || ""))).then(() => {
                user.ban({ reason: args[1] || "", days: 1 })

                sendEmbed(message.channel, message.author, config, "Banned", "Successfully banned <@" + user.id + "> for " + (args[1] || ""))

                data.logs[message.guild.id].bans[user.id] = { "banned": true, "by": message.author.id, "for": args[1] || "" }

                data.logs[message.guild.id].actions.push({ "type": "ban", "by": message.author.id, "against": user.id, "for": args[1] || "" })
            })
        })
    }
}