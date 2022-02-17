const { sendEmbed } = require("../../util.js")
const { runCommand } = require("../../features/commands.js")

module.exports = {
    name: "whois",
    description: "Get info about a user",
    paramiters: [{ type: "paramiter", name: "user", description: "The user to get info about", kind: "user", optional: false }],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        if (args.length < 1) { var newMessage = message; newMessage.content = config.prefix + "help " + module.exports.name; runCommand(newMessage, config); return }

        client.users.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            sendEmbed(message.channel, message.author, config, "User info", "**Username:** " + user.tag + "\n**Id:** " + user.id + "\n**Is bot:** " + (user.bot ? "yes\n**Is verifyied:** " + (user.verified ? "no" : "yes") : "no") + "\n**Created on:** " + new Date(user.createdAt))
        })
    }
}