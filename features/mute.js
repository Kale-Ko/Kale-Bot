var { data } = require("./data.js")

module.exports = {
    name: "mute",
    description: "Delete messages from a user if they are muted",
    events: ["message"],
    run: (name, message) => {
        if (message.channel.type == "dm") return

        if (data.logs[message.guild.id].mutes[message.author.id] != undefined) message.delete()
    }
}