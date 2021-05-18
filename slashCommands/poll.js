const { createEmbed } = require("../util.js")

var numbers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]

module.exports = {
    name: "poll",
    description: "Create a poll",
    expectedArgs: '<title> <option1> <option2> <option3> <option4> <option5> <option6> <option7> <option8> <option9> <option10>',
    minArgs: 3,
    maxArgs: 11,
    testOnly: true,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        var options = ""

        while (args.length > 11) args.splice(args.length - 1, 1)

        var index = 1
        args.forEach(arg => {
            if (index == 1) { index++; return }

            options += (index - 2) + ". " + arg + "\n"

            index++
        })

        return createEmbed("Poll", "**" + args[0] + "**\n" + options)
    }
}