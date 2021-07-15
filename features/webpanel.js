const express = require("express")
const server = express()
const bodyParser = require('body-parser')
server.use(bodyParser.text())
const fs = require("fs")

module.exports = {
    name: "webpanel",
    description: "Creates a web panel for interacting with the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("*", (req, res) => {
            var file = "./features/webpanel" + req.path.replace(/.\//g).replace(/..\//g) + (req.path.replace(/.\//g).replace(/..\//g).includes(".") ? "" : ".html")

            fs.stat(file, (err, status) => {
                if (err) { res.statusCode = 404; res.statusMessage = "Not found"; res.end("Error 404"); return }

                res.statusCode = 200; res.statusMessage = "Ok";
                res.end(fs.readFileSync(file))
            })
        })

        server.post("*", (req, res) => {
            var body = {}

            try { body = JSON.parse(req.body) } catch { return res.end(JSON.stringify({ status: 400, message: "Invalid Body" })) }

            if (body.action == "") {
                res.end(JSON.stringify({ status: 200, message: "Test" }))
            } else res.end(JSON.stringify({ status: 400, message: "Invalid action", received: body }))
        })

        var port = process.env.PORT || 3000 //Math.floor(Math.random() * 10000)

        server.listen(port, () => { if (port == 80) console.info("The webserver is running on http://localhost/\n"); else console.info("The server is running on http://localhost:" + (port) + "/\n") });
    }
}