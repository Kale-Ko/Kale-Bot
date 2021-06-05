const fs = require("fs")
const { data } = require("../../bot.js")
const { createEmbed, sendEmbed } = require("../../util.js")

module.exports = {
    name: "unmute",
    description: "Unmute a person so they can speak",
    paramiters: [{ type: "paramiter", name: "user", optional: false }, { type: "paramiter", name: "reason", optional: true }],
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            user.send(createEmbed("Unmuted", "You have been unmuted in " + user.guild.name + " for " + (args[1] || ""))).then(() => {
                var mutedRole = user.guild.roles.cache.find(role => role.name == "Muted")
                if (mutedRole == null || mutedRole == undefined) { sendEmbed(message.channel, message,author, config, "Error", "There must be a role called 'Muted' in the server"); return }
                
                user.removeRole(mutedRole)

                sendEmbed(message.channel, message.author, config, "Unmuted", "Successfully unmuted <@" + user.id + "> for " + (args[1] || ""))

                data.logs[message.guild.id].actions.push({ "type": "unmute", "by": message.author.id, "against": user.id, "for": args[1] || "" })

                fs.writeFileSync("./data.json", JSON.stringify(data, null, 4))
            })
        })
    }
}