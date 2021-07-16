const express = require("express")
const server = express()

module.exports = {
    name: "webpanel",
    description: "Creates a web panel for interacting with the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("*", (req, res) => { res.statusCode = 200; res.statusMessage = "Ok"; res.end("<body><p>The bot is online</p>/body>") })

        var port = process.env.PORT || 3000

        server.listen(port, () => { })
    }
}