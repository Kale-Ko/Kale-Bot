const { sendEmbed } = require("../util.js")

module.exports = {
    name: "clear",
    description: "Clear a channels messages",
    category: "Management",
    paramiters: "{Amount (Optional)}",
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: async (message, args, client, config) => {
        var amount = args[0]
        if (amount == undefined || amount == null || amount == "") amount = 100

        var fetched = await message.channel.messages.fetch({ limit: amount })

        message.channel.bulkDelete(fetched)

        sendEmbed(message.channel, message.author, config, "Cleared", "Cleared the last " + amount + " messages")
    }
}