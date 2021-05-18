const fs = require("fs")
var { data } = require("../bot.js")
const { sendEmbed } = require("../util.js")

module.exports = {
    name: "prefix",
    description: "Set the prefix",
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: ({ message, args, client, config }) => {
        if (args[0] == undefined || args[0] == "") { sendEmbed(message.channel, message.author, config, "Invalid", "That is not a valid prefix"); return }

        config.prefix = args[0]

        fs.writeFileSync("data.json", JSON.stringify(data, null, 4))

        sendEmbed(message.channel, message.author, config, "Successfully set", "Successfully set the prefix to " + args[0])
    }
}