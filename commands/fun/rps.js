const { sendEmbed } = require("../../util.js")
const RPS = require("../../features/rps.js")

module.exports = {
    name: "rps",
    description: "Play rock paper scissors",
    paramiters: [{ type: "subcommands", commands: [{ name: "play", description: "Play rock paper scissors with someone" }, { name: "end", description: "Stop your game" }] }, { type: "paramiter", name: "person", optional: false }],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        if (args[0] == "play") {
            var user1 = message.guild.member(message.author.id)
            var user2 = message.guild.member(args[1].replace("<@!", "").replace("<@", "").replace(">", ""))

            if (RPS.isInvite(user2, user1)) {
                RPS.acceptInvite(user2, user1)

                RPS.createGame(user2, user1)

                sendEmbed(message.channel, {}, config, "Rock Paper Scissors", "<@" + user2.id + "> and <@" + user1.id + "> please move to the channel with your name under the `Rock Paper Scissors` category")
            } else {
                RPS.createInvite(user1, user2)

                sendEmbed(message.channel, user2, config, "Rock Paper Scissors Invite", "<@" + user1.id + "> invited you to play rock paper scissors, type `" + config.prefix + "rps play @" + user1.tag + "` to start the game")
            }
        } else if (args[0] == "stop") {

        }
    }
}