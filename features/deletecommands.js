var { client, data } = require("../bot.js")

module.exports = {
    name: "deletecommands",
    description: "Delete commands after they are sent",
    events: ["message"],
    run: (name, message) => {
        if (message.channel.type != "dm") var config = data.servers[message.guild.id]; else var config = { prefix: "?", deletetimeout: 2147483.647, atSender: false }

        if (message.channel.name == "bot-commands") {
            if (!message.author.bot) {
                if (!message.deleted) message.delete()
            } else {
                setTimeout(() => {
                    if (!message.deleted) message.delete()
                }, config.deletetimeout * 1000)
            }
        } else {
            if (message.embeds[0] != null) { if (message.embeds[0].title == "Welcome" || message.embeds[0].title == "Poll") return }

            if (message.author.id == client.user.id) {
                setTimeout(() => {
                    if (!message.deleted) message.delete()
                }, config.deletetimeout * 1000)
            }
        }
    }
}