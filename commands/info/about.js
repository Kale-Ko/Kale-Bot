/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "about",
    description: "Get info about the bot",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        sendEmbed(message.channel, message.author, config, "About", "The Kale Bot is a multi purpose Discord bot, with commands for fun, moderation, and interaction")
    }
}