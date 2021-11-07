/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "uptime",
    description: "Get how long the bot has been online",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        var difference = Math.abs(new Date() - client.readyTimestamp)
        var differentDays = Math.ceil(difference / (1000 * 60 * 60 * 24) - 1)
        var differentHours = Math.ceil(difference / (1000 * 60 * 60) - 1) - (differentDays * 24)
        var differentMinutes = Math.ceil(difference / (1000 * 60) - 1) - ((differentHours * 60) + (differentDays * 24 * 60))
        var differentSeconds = Math.ceil(difference / 1000 - 1) - ((differentMinutes * 60) + (differentHours * 60 * 60) + (differentDays * 24 * 60 * 60))

        sendEmbed(message.channel, message.author, config, "Uptime", "The bot has been online for " + differentDays + " days, " + differentHours + " hours, and " + differentMinutes + " minutes and " + differentSeconds + " seconds")
    }
}