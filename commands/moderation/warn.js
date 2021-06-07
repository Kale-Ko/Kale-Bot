const { data } = require("../../bot.js")
const { createEmbed, sendEmbed, uploadData } = require("../../util.js")

module.exports = {
    name: "warn",
    description: "Warn a person",
    paramiters: [{ type: "paramiter", name: "user", optional: false }, { type: "paramiter", name: "reason", optional: false }],
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            user.send(createEmbed("Warned", "You have been warned in " + user.guild.name + " for " + (args[1] || ""))).then(() => {
                sendEmbed(message.channel, message.author, config, "Warned", "Successfully warned <@" + user.id + "> for " + (args[1] || ""))

                if (data.logs[message.guild.id].warns[user.id] == null) data.logs[message.guild.id].warns[user.id] = []

                data.logs[message.guild.id].warns[user.id].push({ "by": message.author.id, "against": user.id, "for": args[1] || "" })

                data.logs[message.guild.id].actions.push({ "type": "warn", "by": message.author.id, "against": user.id, "for": args[1] || "" })

                uploadData()
            })
        })
    }
}