var { data } = require("../bot.js")

module.exports = {
    name: "config",
    description: "Configurate a server with custom options",
    required: true,
    events: ["guildCreate"],
    run: (name, guild) => {
        data.servers[guild.id] = data.defaultConfig
    }
}