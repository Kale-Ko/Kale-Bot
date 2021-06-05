const { sendEmbed } = require("../util.js")

module.exports = {
    name: "roll",
    description: "Roll a die",
    paramiters: [{ type: "paramiter", name: "sides", optional: true }],
    requiredPermissions: [],
    worksInDms: true,
    callback: (message, args, client, config) => {
        var sides = args[0] || 6

        sendEmbed(message.channel, message.author, config, "Dice roll", Math.floor(Math.random() * sides))
    }
}
