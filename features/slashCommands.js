const WOKCommands = require("wokcommands")
var { client } = require("../bot.js")

module.exports = {
    name: "slashCommands",
    description: "Adds slash commands to your server",
    required: false,
    events: ["register"],
    run: (name, guild) => {
        new WOKCommands(client, { commandsDir: "slashCommands", testServers: ["787052330129686560"], showWarns: false, })
    }
}