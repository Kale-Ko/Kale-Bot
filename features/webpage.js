const express = require("express")
const server = express()
const fs = require("fs")

module.exports = {
    name: "webpage",
    description: "Creates a simple status page for the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("*", (req, res) => {
            var file = req.path.replace("/", "").replace(new RegExp("../", "g")).replace(".html", "") + ".html"

            console.log(file)

            fs.stat(file, (err, stats) => {
                if (err) {
                    res.statusCode = 404; res.statusMessage = "Not Found"

                    res.end("404 Not Found")

                    return
                }

                res.statusCode = 200; res.statusMessage = "Ok"

                res.end(fs.readFileSync(file))
            })
        })

        var port = process.env.PORT || 3000

        server.listen(port, () => { console.log("Launched web server on " + port) })
    }
}
