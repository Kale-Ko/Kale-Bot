const { data } = require("../../bot.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listwarns",
    description: "List all warnings",
    paramiters: [{ type: "paramiter", name: "user", optional: true }],
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var warns = ""

        for (var key of Object.keys(data.logs[message.guild.id].warns)) {
            if (args[0] != undefined) {
                if (key == args[0].replace("<@!", "").replace("<@", "").replace(">", "")) {
                    data.logs[message.guild.id].warns[key].forEach(warn => {
                        warns += "<@" + warn.by + "> for " + warn.for + "\n"
                    })
                }
            } else {
                data.logs[message.guild.id].warns[key].forEach(warn => {
                    warns += "<@" + warn.by + "> " + " against <@" + warn.against + "> for " + warn.for + "\n"
                })
            }
        }

        sendEmbed(message.channel, message.author, config, "Warns", warns)
    }
}