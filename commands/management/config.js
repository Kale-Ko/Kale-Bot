const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "config",
    description: "Get config values",
    paramiters: [],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var helpText = ""

        function decode(parent, indent) {
            for (var key of Object.keys(parent)) {
                if (parent[key] == "[object Object]") { helpText += indent + key + ":\n"; decode(parent[key], indent + "  "); continue }

                helpText += indent + key + " - " + parent[key] + "\n"
            }
        }
        decode(config, "")

        helpText = helpText.replace(/, /ig, ",").replace(/,/ig, ", ")

        sendEmbed(message.channel, message.author, config, "Config", helpText)
    }
}
