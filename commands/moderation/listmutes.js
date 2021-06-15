const { data } = require("../../bot.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listmutes",
    description: "List all server mutes",
    paramiters: [],
    requiredPermissions: ["MUTE_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var mutes = ""

        for (var key of Object.keys(data.logs[message.guild.id].mutes)) {
            mutes += "<@" + key + "> muted by <@" + data.logs[message.guild.id].mutes[key].by + "> for " + data.logs[message.guild.id].mutes[key].for + "\n"
        }

        sendEmbed(message.channel, message.author, config, "Mutes", mutes)
    }
}