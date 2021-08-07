const { data } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listwarns",
    description: "List all warnings",
    paramiters: [{ type: "paramiter", name: "user", description: "The user to list for", kind: "user", optional: true }],
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var warns = ""

        for (var key of Object.keys(data.logs[message.guild.id].warns)) {
            if (args[0] != undefined) {
                if (key == args[0].replace("<@!", "").replace("<@", "").replace(">", "")) {
                    data.logs[message.guild.id].warns[key].forEach(warn => {
                        warns += "<@" + key + "> " + " warned by <@" + warn.by + "> for " + warn.for + "\n"
                    })
                }
            } else {
                data.logs[message.guild.id].warns[key].forEach(warn => {
                    warns += "<@" + key + "> " + " warned by <@" + warn.by + "> for " + warn.for + "\n"
                })
            }
        }

        sendEmbed(message.channel, message.author, config, "Warns", warns)
    }
}