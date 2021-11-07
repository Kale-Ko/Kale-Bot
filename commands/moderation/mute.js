/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { data } = require("../../features/data.js")
const { createEmbed, sendEmbed } = require("../../util.js")

module.exports = {
    name: "mute",
    description: "Mute a person so they can't speak",
    paramiters: [{ type: "paramiter", name: "user", description: "The user to mute", kind: "user", optional: false }, { type: "paramiter", name: "reason", description: "The reason for the mute", kind: "string", optional: true }],
    requiredPermissions: ["MUTE_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            user.send(createEmbed("Muted", "You have been muted in " + user.guild.name + " for " + (args[1] || ""))).then(() => {
                sendEmbed(message.channel, message.author, config, "Muted", "Successfully muted <@" + user.id + "> for " + (args[1] || ""))

                data.logs[message.guild.id].mutes[user.id] = { "muted": true, "by": message.author.id, "for": args[1] || "" }

                data.logs[message.guild.id].actions.push({ "type": "mute", "by": message.author.id, "against": user.id, "for": args[1] || "" })
            })
        })
    }
}