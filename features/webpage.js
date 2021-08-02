const express = require("express")
const server = express()

module.exports = {
    name: "webpage",
    description: "Creates a simple status page for the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("/invite", (req, res) => { res.statusCode = 200; res.statusMessage = "Ok"; res.end('<body><p>Redirecting to invite</p><script>window.location.replace("https://discord.com/api/oauth2/authorize?client_id=786586380321947662&permissions=8&redirect_uri=https%3A%2F%2Fkalebot.kaleko.ga%2Fauth&scope=bot%20applications.commands")</script></body>') })

        server.get("*", (req, res) => { res.statusCode = 200; res.statusMessage = "Ok"; res.end('<body><p>The bot is online</p><br><p><a href="https://kalebot.kaleko.ga/invite">Invite</a> it to your own server to see what it can do</p></body>') })

        var port = process.env.PORT || 3000

        server.listen(port, () => { })
    }
}
