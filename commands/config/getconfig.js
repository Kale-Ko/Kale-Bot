/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "getconfig",
    description: "Get config values",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var helpText = ""

        function decode(parent, indent) {
            for (var key of Object.keys(parent)) {
                if (!require("../../bot.js").config.allowedConfig.includes(key.split(".")[0]) && parent == config) continue

                if (parent[key] == "[object Object]") { helpText += indent + key + ":\n"; decode(parent[key], indent + "  "); continue }

                helpText += indent + key + " - " + parent[key] + "\n"
            }
        }
        decode(config, "")

        helpText = helpText.replace(/, /ig, ",").replace(/,/ig, ", ")

        sendEmbed(message.channel, message.author, config, "Config", helpText)
    }
}
