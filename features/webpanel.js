const express = require("express")
const server = express()

module.exports = {
    name: "webpanel",
    description: "Creates a web panel for interacting with the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("/invite", (req, res) => { res.statusCode = 200; res.statusMessage = "Ok"; res.end('<body><p>Redirecting to invite</p><script>window.location.replace("https://discord.com/api/oauth2/authorize?client_id=786586380321947662&permissions=2952130134&redirect_uri=https%3A%2F%2Fkalebot.kaleko.ga%2F&scope=bot%20applications.commands")</script></body>') })

        server.get("*", (req, res) => { res.statusCode = 200; res.statusMessage = "Ok"; res.end("<body><p>The bot is online</p></body>") })

        var port = process.env.PORT || 3000

        server.listen(port, () => { })
    }
}