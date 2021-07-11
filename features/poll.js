var { data } = require("../bot.js")

var numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]

module.exports = {
    name: "poll",
    description: "Add reactions to polls",
    events: ["message"],
    run: (name, message) => {
        if (message.channel.type != "dm") var config = data.configs[message.guild.id]; else var config = { prefix: "?", deleteTimeout: 2147483.647, atSender: false }

        if (message.embeds[0] != null) if (message.embeds[0].title == "Poll") {
            var args = message.content.toLowerCase().split(" "); args.shift()

            for (var index = 0; index < (parseInt(message.embeds[0].description.split("\n").pop().split(".")[0]) + 1); index++) if (!message.deleted) message.react(numbers[index])
        }
    }
}