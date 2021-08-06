var { client } = require("../bot.js")
var { data } = require("./data.js")

module.exports = {
    name: "statistics",
    description: "Puts statistics at the top of your server",
    events: ["register", "guildCreate", "channelCreate", "channelDelete", "guildMemberAdd", "guildMemberRemove", "guildMemberUpdate", "roleCreate", "roleDelete"],
    run: (name, event) => {
        if (event.type == "dm") return

        if (name == "register") {
            client.guilds.cache.forEach(guild => { module.exports.update(guild) })
        } else if (name == "guildCreate") {
            module.exports.update(event)
        } else if (name == "channelCreate" || name == "channelDelete" || name == "guildMemberAdd" || name == "guildMemberRemove" || name == "roleCreate" || name == "roleDelete") {
            if (name == "channelCreate" || name == "channelDelete") { if (event.name != "Stats" && event.parent != event.guild.channels.cache.find(channel => channel.type == "category" && channel.name == "Stats" && channel.position == 0).id) module.exports.update(event.guild) } else module.exports.update(event.guild)
        } else if (name == "guildMemberUpdate") {
            var max = new Date()
            max.setMinutes(max.getMinutes() + 1)
            var min = new Date()
            min.setMinutes(min.getMinutes() - 1)

            if (event.premiumSinceTimestamp <= max && event.premiumSinceTimestamp >= min) module.exports.update(event.guild)
        }
    },
    update: (guild) => {
        if (!guild.me.hasPermission("MANAGE_CHANNELS")) return

        var config = data.configs[guild.id]

        var statsCategory = guild.channels.cache.find(channel => channel.type == "category" && channel.name == "Stats" && channel.position == 0)

        if (statsCategory == null) guild.channels.create("Stats", { type: "category", position: 0, permissionOverwrites: [{ id: guild.roles.cache.find(role => role.name === '@everyone').id, deny: ["CONNECT"] }] })

        if (statsCategory == null) return

        statsCategory.children.forEach(channel => channel.delete())

        if (config.stats.members) guild.channels.create("Members: " + guild.memberCount, { type: "voice", parent: statsCategory.id })
        if (config.stats.channels) guild.channels.create("Channels: " + guild.channels.cache.filter(channel => channel.parent != statsCategory.id).size, { type: "voice", parent: statsCategory.id })
        if (config.stats.roles) guild.channels.create("Roles: " + guild.roles.cache.filter(role => true).size, { type: "voice", parent: statsCategory.id })
        if (config.stats.boosts) guild.channels.create("Boosts: " + guild.premiumSubscriptionCount, { type: "voice", parent: statsCategory.id })

        /*var statsCategory = guild.channels.cache.find(channel => channel.type == "category" && channel.name == "Stats" && channel.position == 0)
        
        if (statsCategory != null) {
            statsCategory.children.forEach(channel => channel.delete())
        
            statsCategory.delete()
        }*/
    }
}