const http = require("http")
var { data } = require("../bot.js")

module.exports = {
    name: "config",
    description: "Configurate a server with custom options",
    required: true,
    events: ["register"],
    run: (name, event) => {
        http.createServer(function (req, res) { res.end("<p>The bot is online! Stay on this page to keep it running</p><script>setTimeout(() => { window.location.reload() }, 15000)</script>") }).listen(process.env.PORT || 80);
    }
}
