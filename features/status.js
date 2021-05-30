var { client, data } = require("../bot.js")

module.exports = {
    name: "status",
    description: "Change the bots status",
    events: ["register"],
    run: (name, event) => {
        client.user.setPresence({ status: "online", activity: { name: data.status, type: data.statusType } })
    }
}