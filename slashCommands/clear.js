const { createEmbed } = require("../util.js")

module.exports = {
    name: "clear",
    description: "Clear a channels messages",
    expectedArgs: '<amount>',
    minArgs: 0,
    maxArgs: 1,
    testOnly: true,
    slash: true,
    hidden: true,
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        if (channel.type == "dm") return createEmbed("Denied", "You can't do that in dms", "https://static.thenounproject.com/png/372212-200.png")

        var [amount] = args
        if (amount == undefined || amount == null || amount == "" || amount == 0) amount = 100

        var fetched = await channel.messages.fetch({ limit: amount })

        channel.bulkDelete(fetched)

        return createEmbed("Cleared", "Cleared the last " + amount + " messages")
    }
}