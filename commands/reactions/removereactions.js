/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { data } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "removereactions",
    description: "Remove reaction roles",
    paramiters: [{ type: "paramiter", name: "messageUrl", description: "The message to remove the reactions from", kind: "string", optional: false }],
    requiredPermissions: ["MANAGE_ROLES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        config.reactions.forEach(reaction => { if (reaction.channel == args[0].split("/")[args[0].split("/").length - 2] && reaction.message == args[0].split("/")[args[0].split("/").length - 1]) config.reactions.splice(config.reactions.indexOf(reaction), 1) })
        data.configs[message.guild.id] = config

        var channel = message.guild.channels.cache.get(args[0].split("/")[args[0].split("/").length - 2])
        channel.messages.fetch(args[0].split("/")[args[0].split("/").length - 1]).then(rrmessage => {
            rrmessage.reactions.removeAll()

            sendEmbed(message.channel, message.author, config, "Reaction Roles", "Successfully removed reaction roles")
        })
    }
}