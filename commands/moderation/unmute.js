/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { data } = require("../../features/data.js")
const { createEmbed, sendEmbed } = require("../../util.js")

module.exports = {
    name: "unmute",
    description: "Unmute a person so they can speak",
    paramiters: [{ type: "paramiter", name: "user", description: "The user to unmute", kind: "user", optional: false }, { type: "paramiter", name: "reason", description: "The reason for the unmute", kind: "string", optional: true }],
    requiredPermissions: ["MUTE_MEMBERS"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            user.send(createEmbed("Unmuted", "You have been unmuted in " + user.guild.name + " for " + (args[1] || ""))).then(() => {
                sendEmbed(message.channel, message.author, config, "Unmuted", "Successfully unmuted <@" + user.id + "> for " + (args[1] || ""))

                delete data.logs[message.guild.id].mutes[user.id]

                data.logs[message.guild.id].actions.push({ "type": "unmute", "by": message.author.id, "against": user.id, "for": args[1] || "" })
            })
        })
    }
}