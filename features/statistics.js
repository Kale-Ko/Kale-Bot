var { client } = require("../bot.js")
var { data } = require("./data.js")

module.exports = {
    name: "statistics",
    description: "Puts statistics at the top of your server",
    feature: "stats",
    events: ["register", "guildCreate", "channelCreate", "channelDelete", "guildMemberAdd", "guildMemberRemove", "guildMemberUpdate", "roleCreate", "roleDelete"],
    run: (name, event) => {
        if (event.type == "DM") return

        if (name == "register") {
            client.guilds.cache.forEach(guild => { module.exports.update(guild) })
        } else if (name == "guildCreate") {
            module.exports.update(event)
        } else if (name == "channelCreate" || name == "channelDelete" || name == "guildMemberAdd" || name == "guildMemberRemove" || name == "roleCreate" || name == "roleDelete") {
            var statsCategory = event.guild.channels.cache.find(channel => channel.type == "GUILD_CATEGORY" && channel.name == "Stats") || {}

            if (name == "channelCreate" || name == "channelDelete") { if (event.name != "Stats" && event.parent != statsCategory.id) module.exports.update(event.guild) } else module.exports.update(event.guild)
        } else if (name == "guildMemberUpdate") {
            var max = new Date()
            max.setMinutes(max.getMinutes() + 1)
            var min = new Date()
            min.setMinutes(min.getMinutes() - 1)

            if (event.premiumSinceTimestamp <= max && event.premiumSinceTimestamp >= min) module.exports.update(event.guild)
        }
    },
    update: (guild) => {
        if (!guild.me.permissions.has("MANAGE_CHANNELS", true)) return

        var config = data.configs[guild.id]

        var statsCategory = guild.channels.cache.find(channel => channel.type == "GUILD_CATEGORY" && channel.name == "Stats")
        if (statsCategory == null) {
            guild.channels.create("Stats", { type: "GUILD_CATEGORY", position: 0, permissionOverwrites: [{ id: guild.roles.cache.find(role => role.name === '@everyone').id, deny: ["CONNECT"] }] })
            statsCategory = guild.channels.cache.find(channel => channel.type == "GUILD_CATEGORY" && channel.name == "Stats")
        }

        if (statsCategory == null) return

        var membersstat = guild.channels.cache.find(channel => channel.type == "GUILD_VOICE" && channel.name.startsWith("Members: "))
        var channelsstat = guild.channels.cache.find(channel => channel.type == "GUILD_VOICE" && channel.name.startsWith("Channels: "))
        var rolesstat = guild.channels.cache.find(channel => channel.type == "GUILD_VOICE" && channel.name.startsWith("Roles: "))
        var boostsstat = guild.channels.cache.find(channel => channel.type == "GUILD_VOICE" && channel.name.startsWith("Boosts: "))

        if (config.stats.members || config.stats.channels || config.stats.roles || config.stats.boosts) {
            if (config.stats.members) {
                if (membersstat == null) {
                    guild.channels.create("Members: " + guild.memberCount, { type: "GUILD_VOICE", parent: statsCategory.id })
                } else {
                    membersstat.setName("Members: " + guild.memberCount)
                }
            }
            if (config.stats.channels) {
                if (channelsstat == null) {
                    guild.channels.create("Channels: " + guild.channels.cache.filter(channel => channel.parent != statsCategory.id).size, { type: "GUILD_VOICE", parent: statsCategory.id })
                } else {
                    channelsstat.setName("Channels: " + guild.channels.cache.filter(channel => channel.parent != statsCategory.id).size)
                }
            }
            if (config.stats.roles) {
                if (rolesstat == null) {
                    guild.channels.create("Roles: " + guild.roles.cache.filter(role => true).size, { type: "GUILD_VOICE", parent: statsCategory.id })
                } else {
                    rolesstat.setName("Roles: " + guild.roles.cache.filter(role => true).size)
                }
            }
            if (config.stats.boosts) {
                if (boostsstat == null) {
                    guild.channels.create("Boosts: " + guild.premiumSubscriptionCount, { type: "GUILD_VOICE", parent: statsCategory.id })
                } else {
                    boostsstat.setName("Boosts: " + guild.premiumSubscriptionCount)
                }
            }
        } else if (statsCategory != null) {
            statsCategory.children.forEach(channel => { channel.delete() })

            statsCategory.delete()
        }
    }
}
