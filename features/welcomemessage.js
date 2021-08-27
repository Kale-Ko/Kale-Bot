const { sendEmbed } = require("../util.js")

module.exports = {
    name: "welcomemessage",
    description: "Send join and leave messages",
    events: ["guildMemberAdd", "guildMemberRemove"],
    run: (name, user) => {
        if (name == "guildMemberAdd") {
            sendEmbed(user.guild.channels.cache.get(user.guild.systemChannelID), null, { atSender: false }, "Welcome", "Welcome to the server <@" + user.user.id + ">!")
        } else if (name == "guildMemberRemove") {
            sendEmbed(user.guild.channels.cache.get(user.guild.systemChannelID), null, { atSender: false }, "Bye", "Sad to see you go " + user.user.tag + " :(")
        }
    }
}