const { sendEmbed } = require("../util.js")

module.exports = {
    name: "config",
    description: "Get info about the bot",
    category: "Info",
    subCommands: [{ name: "get", description: "Get all the current config", paramiters: [], requiredPermissions: [], }],
    paramiters: [],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        
    }
}