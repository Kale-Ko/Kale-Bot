/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

var { data } = require("./data.js")

module.exports = {
    name: "mute",
    description: "Delete messages from a user if they are muted",
    feature: "moderation",
    events: ["messageCreate"],
    run: (name, message) => {
        if (message.channel.type == "DM") return

        if (data.logs[message.guild.id].mutes[message.author.id] != undefined) message.delete()
    }
}