const { data } = require("../../bot.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listmoderations",
    description: "List all server moderations",
    paramiters: [{ type: "paramiter", name: "user", optional: true }],
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var moderations = ""

        data.logs[message.guild.id].actions.forEach(action => {
            if (args[0] != undefined) {
                if (action.against == args[0].replace("<@!", "").replace("<@", "").replace(">", "")) moderations += "<@" + action.by + "> " + action.type + " for " + action.reason + "\n"
            } else moderations += "<@" + action.by + "> " + action.type + " <@" + action.against + "> for " + action.reason + "\n"
        })

        sendEmbed(message.channel, message.author, config, "Moderations", moderations)
    }
}