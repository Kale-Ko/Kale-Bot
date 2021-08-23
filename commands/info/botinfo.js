const { stats } = require("../../bot.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "botinfo",
    description: "Get analytics for the bot",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        var peopleCount = 0

        client.guilds.cache.forEach(guild => { peopleCount += guild.memberCount })


        client.guilds.cache.forEach(guild => {
            if (guild.name.includes("bot")) console.log(guild.name)
        })

        sendEmbed(message.channel, message.author, config, "Bot Info", "The bot is currently in " + client.guilds.cache.size + " different servers reaching " + peopleCount + " people\n" + stats.commands + " commands have been run in the past minute")
    }
}