const { sendEmbed } = require("../../util.js")
const RPS = require("../../features/rps.js")

module.exports = {
    name: "rps",
    description: "Play rock paper scissors",
    paramiters: [{ type: "subcommands", commands: [{ name: "play", description: "Play rock paper scissors with someone" }, { name: "decline", description: "Decline an invite from someone" }] }, { type: "paramiter", name: "user", optional: false }],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        if (args[0] == "play") {
            var user1 = message.guild.member(message.author.id).user
            var user2 = message.guild.member(args[1].replace("<@!", "").replace("<@", "").replace(">", "")).user

            if (RPS.isInvite(user2, user1)) {
                RPS.deleteInvite(user2, user1)

                RPS.createGame(user2, user1)

                var everyone = message.guild.roles.cache.find(role => role.name == "@everyone")

                message.guild.channels.create(user1.username.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, ""), { topic: user1.username + " and " + user2.username + "'s rock paper scissors game", permissionOverwrites: [{ id: everyone.id, deny: ["VIEW_CHANNEL"] }, { id: user1.id, allow: ["VIEW_CHANNEL"] }] })
                message.guild.channels.create(user2.username.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, ""), { topic: user2.username + " and " + user1.username + "'s rock paper scissors game", permissionOverwrites: [{ id: everyone.id, deny: ["VIEW_CHANNEL"] }, { id: user2.id, allow: ["VIEW_CHANNEL"] }] })

                sendEmbed(message.channel, {}, { atsender: false }, "Rock Paper Scissors", "<@" + user2.id + "> and <@" + user1.id + "> please move to the channel with your name")
            } else {
                RPS.createInvite(user1, user2)

                sendEmbed(message.channel, user2, config, "Rock Paper Scissors Invite", "<@" + user1.id + "> invited you to play rock paper scissors, type `" + config.prefix + "rps play @" + user1.username + "` to start the game or `" + config.prefix + "rps decline @" + user1.username + "` to decline the game")
            }
        } else if (args[0] == "decline") {
            var user1 = message.guild.member(message.author.id).user
            var user2 = message.guild.member(args[1].replace("<@!", "").replace("<@", "").replace(">", "")).user

            if (RPS.isInvite(user2, user1)) {
                RPS.deleteInvite(user2, user1)

                sendEmbed(message.channel, user2, config, "Rock Paper Scissors Invite", "<@" + user1.id + "> has declined your invite")
            }
        }
    }
}