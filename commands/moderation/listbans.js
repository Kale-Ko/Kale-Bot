/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { data } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listbans",
    description: "List all server bans",
    paramiters: [],
    requiredPermissions: ["BAN_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var bans = ""

        for (var key of Object.keys(data.logs[message.guild.id].bans)) {
            bans += "<@" + key + "> baned by <@" + data.logs[message.guild.id].bans[key].by + "> for " + data.logs[message.guild.id].bans[key].for + "\n"
        }

        sendEmbed(message.channel, message.author, config, "Bans", bans)
    }
}