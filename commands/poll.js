const { sendEmbed } = require("../util.js")

var numbers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]

module.exports = {
    name: "poll",
    description: "Create a poll",
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var options = ""

        while (args.length > 11) args.splice(args.length - 1, 1)

        var index = 1
        args.forEach(arg => {
            if (index == 1) { index++; return }

            options += (index - 2) + ". " + arg + "\n"

            index++
        })

        sendEmbed(message.channel, message.author, config, "Poll", "**" + args[0] + "**\n" + options)
    },
    addReactions: async (message, args, client, config) => {
        for (var index = 0; index < (parseInt(message.embeds[0].description.split("\n").pop().split(".")[0]) + 1); index++) message.react(numbers[index])
    }
}