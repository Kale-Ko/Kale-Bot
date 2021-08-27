const { sendEmbed } = require("../../util.js")
const { data, uploadData } = require("../../features/data.js")

module.exports = {
    name: "setconfig",
    description: "Set config values",
    paramiters: [{ type: "paramiter", name: "key", description: "The config key to set", kind: "string", optional: false }, { type: "paramiter", name: "value", description: "The value to set the key to", kind: "string", optional: false }],
    requiredPermissions: ["MANAGE_SERVER"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        if (!require("../../bot.js").config.allowedConfig.includes(args[0].split(".")[0])) {
            sendEmbed(message.channel, message.author, config, "Config", "That is not a valid config value")

            return
        }

        var value = args[1]
        if (value == "true") value = true
        if (value == "false") value = false

        updateNestedValueOfObj(config, args[0], value)

        data.configs[message.guild.id] = config

        uploadData()


        sendEmbed(message.channel, message.author, config, "Config", "Successfully set " + args[0] + " to " + args[1])

        function updateNestedValueOfObj(data, string, value) {
            let tempObj = data
            var args = string.split(".")

            for (var index = 0; index < args.length - 1; index++) {
                var element = args[index]

                if (!tempObj[element]) tempObj[element] = {}

                tempObj = tempObj[element]
            }

            if (!value) { return tempObj[args[args.length - 1]] }

            tempObj[args[args.length - 1]] = value
        }
    }
}