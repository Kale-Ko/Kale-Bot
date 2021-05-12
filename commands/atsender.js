const fs = require("fs")
var { sendEmbed, data } = require("../bot.js")

module.exports = {
    name: "atsender",
    description: "Change whether it ats the sender of the message",
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: ({ message, args, client, config }) => {
        if (args[0] != "true" && args[0] != true && args[0] == "false" && args[0] == false) { sendEmbed(message.channel, message.author, config, "Invalid", "That is not a valid bollean"); return }

        var value = true; if (args[0] == "false" || args[0] == false) value = false

        config.atSender = value

        fs.writeFileSync("data.json", JSON.stringify(data, null, 4))

        sendEmbed(message.channel, message.author, config, "Successfully set", "Successfully set at sender to " + value)
    }
}