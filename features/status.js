/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

var { client, config } = require("../bot.js")

module.exports = {
    name: "status",
    description: "Change the bots status",
    events: ["register"],
    run: (name, event) => {
        client.user.setPresence({ status: "online", activity: { name: config.status, type: config.statusType } })
    }
}