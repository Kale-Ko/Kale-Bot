const fs = require("fs")
var { data } = require("../bot.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "deletetimeout",
    description: "Set the delete timeout",
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: ({ message, args, client, config }) => {
        if (args[0] == undefined || args[0] == "") { sendEmbed(message.channel, message.author, config, "Invalid", "That is not a valid amount"); return }

        config.deleteTimeout = parseFloat(args[0])

        fs.writeFileSync("data.json", JSON.stringify(data, null, 4))

        sendEmbed(message.channel, message.author, config, "Successfully set", "Successfully set the delete timout to " + args[0])
    }
}