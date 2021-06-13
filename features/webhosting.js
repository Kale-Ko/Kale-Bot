const http = require("http")

module.exports = {
    name: "webhosting",
    description: "Creates a web server so that the bot does not crash on hosting sites",
    events: ["register"],
    run: (name, event) => {
        http.createServer(function (req, res) { res.end("<p>The bot is online! Stay on this page to keep it running</p>\n\n<script>\n  setTimeout(() => { window.location.reload() }, 15000)\n</script>") }).listen(process.env.PORT || 3000);
    }
}