const { sendEmbed } = require("../util.js")
const { runCommand } = require("../features/commands.js")

var numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]

module.exports = {
    name: "poll",
    description: "Create a poll",
    category: "Fun",
    paramiters: [{ type: "paramiter", name: "title", optional: false }, { type: "paramiter", name: "option 1", optional: false }, { type: "paramiter", name: "option 2", optional: false }, { type: "paramiter", name: "option 3-10", optional: true }],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var options = ""

        if (args.length < 3) { var newMessage = message; newMessage.content = config.prefix + "help " + module.exports.name; runCommand(newMessage, config); return }

        while (args.length > 11) args.splice(args.length - 1, 1)

        var index = 1
        args.forEach(arg => {
            if (index == 1) { index++; return }

            options += (index - 1) + ". " + arg + "\n"

            index++
        })

        sendEmbed(message.channel, message.author, config, "Poll", "**" + args[0] + "**\n" + options)
    },
    addReactions: async (message, args, client, config) => {
        for (var index = 0; index < (parseInt(message.embeds[0].description.split("\n").pop().split(".")[0]) + 1); index++) if (!message.deleted) message.react(numbers[index])
    }
}
