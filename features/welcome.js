/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { data } = require("./data.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "welcome",
    description: "Send join and leave messages",
    feature: "welcome",
    events: ["guildMemberAdd", "guildMemberRemove"],
    run: (name, user) => {
        if (user.user.bot && !data.configs[user.guild.id].welcomeBots) return

        if (name == "guildMemberAdd") {
            sendEmbed(user.guild.channels.cache.get(user.guild.systemChannelID), null, { atSender: false }, "Welcome", "Welcome to the server <@" + user.user.id + ">!")
        } else if (name == "guildMemberRemove") {
            sendEmbed(user.guild.channels.cache.get(user.guild.systemChannelID), null, { atSender: false }, "Bye", "Sad to see you go " + user.user.tag + " :(")
        }
    }
}