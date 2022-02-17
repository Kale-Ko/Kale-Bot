var { client } = require("../bot.js")
var { data } = require("./data.js")

module.exports = {
    name: "reactionroles",
    description: "Give users roles when they react to a message",
    feature: "reactions",
    events: ["register", "messageReactionAdd", "messageReactionRemove"],
    run: (name, reaction, user) => {
        if (name == "messageReactionAdd") {
            if (reaction.me) return

            data.configs[reaction.message.guild.id].reactions.forEach(reactiondata => {
                if (reaction.emoji.name == reactiondata.emoji && reaction.message.channel.id == reactiondata.channel && reaction.message.id == reactiondata.message) {
                    user = reaction.message.guild.members.cache.get(user.id)

                    user.roles.add(reaction.message.guild.roles.cache.get(reactiondata.role), "Reaction Roles")
                }
            })
        } else if (name == "messageReactionRemove") {
            if (reaction.me) return

            data.configs[reaction.message.guild.id].reactions.forEach(reactiondata => {
                if (reaction.emoji.name == reactiondata.emoji && reaction.message.channel.id == reactiondata.channel && reaction.message.id == reactiondata.message) {
                    user = reaction.message.guild.members.cache.get(user.id)

                    user.roles.remove(reaction.message.guild.roles.cache.get(reactiondata.role), "Reaction Roles")
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