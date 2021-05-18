var { sendEmbed, client, data } = require("../bot.js")

module.exports = {
    name: "welcome",
    description: "Sends a welcome message whenever someone joins the server",
    required: false,
    events: ["guildMemberAdd"],
    run: (name, member) => {
        var channel = member.guild.channels.catch.find(channel => channel.name == "welcome")

        sendEmbed(channel, member, { prefix: "?", deleteTimeout: 2147483647, atSender: false }, "Welcome", "Welcome <@" + member.id + ">, enjoy your stay!")
    }
}