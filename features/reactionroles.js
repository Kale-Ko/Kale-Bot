var { client } = require("../bot.js")
var { data } = require("./data.js")

module.exports = {
    name: "reactionroles",
    description: "Give users roles when they react to a message",
    events: ["register", "messageReactionAdd", "messageReactionRemove"],
    run: (name, reaction) => {
        if (name == "messageReactionAdd") {
            if (reaction.me) return

            data.configs[reaction.message.guild.id].reactions.forEach(reactiondata => {
                if (reaction.emoji.name == reactiondata.emoji && reaction.message.channel.id == reactiondata.channel && reaction.message.id == reactiondata.message) {
                    console.log("Give role")
                }
            })
        } else if (name == "messageReactionRemove") {
            if (reaction.me) return

            data.configs[reaction.message.guild.id].reactions.forEach(reactiondata => {
                if (reaction.emoji.name == reactiondata.emoji && reaction.message.channel.id == reactiondata.channel && reaction.message.id == reactiondata.message) {
                    console.log("Remove role")
                }
            })
        } else {
            client.guilds.cache.forEach(guild => {
                data.configs[guild.id].reactions.forEach(reaction => {
                    guild.channels.cache.get(reaction.channel).messages.fetch(reaction.message)
                })
            })
        }
    }
}