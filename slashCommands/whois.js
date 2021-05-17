var { createEmbed, data } = require("../bot.js")

module.exports = {
    name: "whois",
    description: "Get info about a user",
    expectedArgs: '<user>',
    minArgs: 1,
    maxArgs: 1,
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        client.users.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).then(user => {
            return createEmbed("User info", "**Username:** " + user.tag + "\n**Id:** " + user.id + "\n**Is bot:** " + (user.bot ? "yes\n**Is verifyied:** " + (user.verified ? "no" : "yes") : "no") + "\n**Created on:** " + new Date(user.createdAt))
        })
    }
}