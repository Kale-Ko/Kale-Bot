const { data } = require("../../bot.js")
const { createEmbed, sendEmbed, uploadData } = require("../../util.js")

module.exports = {
    name: "kick",
    description: "Kick a person from the server",
    paramiters: [{ type: "paramiter", name: "user", optional: false }, { type: "paramiter", name: "reason", optional: true }],
    requiredPermissions: ["KICK_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            user.send(createEmbed("Kicked", "You have been kicked in " + user.guild.name + " for " + (args[1] || ""))).then(() => {
                user.kick(args[1] || "")

                sendEmbed(message.channel, message.author, config, "Kicked", "Successfully kicked <@" + user.id + "> for " + (args[1] || ""))

                data.logs[message.guild.id].actions.push({ "type": "kick", "by": message.author.id, "against": user.id, "for": args[1] || "" })

                uploadData()
            })
        })
    }
}