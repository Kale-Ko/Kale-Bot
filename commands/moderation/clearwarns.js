const { data, uploadData } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "clearwarns",
    description: "Clear all the warns for a person",
    paramiters: [{ type: "paramiter", name: "user", optional: false }, { type: "paramiter", name: "reason", optional: false }],
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            sendEmbed(message.channel, message.author, config, "Cleared Warns", "Successfully cleared the warns of <@" + user.id + "> for " + (args[1] || ""))

            if (data.logs[message.guild.id].warns[user.id] == null) data.logs[message.guild.id].warns[user.id] = []

            delete data.logs[message.guild.id].warns[user.id]

            data.logs[message.guild.id].actions.push({ "type": "clearswarns", "by": message.author.id, "against": user.id, "for": args[1] || "" })

            uploadData()
        })
    }
}