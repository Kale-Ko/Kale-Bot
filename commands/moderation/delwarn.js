const { data, uploadData } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "delwarn",
    description: "Delete the latest warn for a person",
    paramiters: [{ type: "paramiter", name: "user", optional: false }, { type: "paramiter", name: "reason", optional: false }],
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            sendEmbed(message.channel, message.author, config, "Deleted Warned", "Successfully deleted the latest warn for <@" + user.id + "> for " + (args[1] || ""))
            if (data.logs[message.guild.id].warns[user.id] == null) data.logs[message.guild.id].warns[user.id] = []

            data.logs[message.guild.id].warns[user.id].pop()

            data.logs[message.guild.id].actions.push({ "type": "delwarn", "by": message.author.id, "against": user.id, "for": args[1] || "" })

            uploadData()
        })
    }
}