const { sendEmbed } = require("../util.js")
const { runCommand } = require("../features/commands.js")

module.exports = {
    name: "whois",
    description: "Get info about a user",
    category: "Info",
    paramiters: [{ type: "paramiter", name: "user", optional: false }],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        if (args.length < 1) { var newMessage = message; newMessage.content = config.prefix + "help " + module.exports.name; runCommand(newMessage, config); return }

        client.users.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            sendEmbed(message.channel, message.author, config, "User info", "**Username:** " + user.tag + "\n**Id:** " + user.id + "\n**Is bot:** " + (user.bot ? "yes\n**Is verifyied:** " + (user.verified ? "no" : "yes") : "no") + "\n**Created on:** " + new Date(user.createdAt))
        })
    }
}
