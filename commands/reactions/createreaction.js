const { data, uploadData } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "createreaction",
    description: "Create a reaction role",
    paramiters: [{ type: "paramiter", name: "messageUrl", description: "The message to add the reaction role to", kind: "string", optional: false }, { type: "paramiter", name: "emoji", description: "The emoji to use", kind: "string", optional: false }, { type: "paramiter", name: "role", description: "The role to give", kind: "role", optional: false }],
    requiredPermissions: ["MANAGE_ROLES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        config.reactions.push({ channel: args[0].split("/")[args[0].split("/").length - 2], message: args[0].split("/")[args[0].split("/").length - 1], emoji: args[1], role: args[2].replace("<@", "").replace("<@!", "").replace(">", "") })

        var channel = message.guild.channels.cache.get(args[0].split("/")[args[0].split("/").length - 2])
        channel.messages.fetch(args[0].split("/")[args[0].split("/").length - 1]).then(rrmessage => {
            rrmessage.react(args[1].replace(/:/, ""))

            sendEmbed(message.channel, message.author, config, "Reaction Roles", "Successfully created reaction role " + args[1] + " -> " + args[2])
        })
    }
}