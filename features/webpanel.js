const express = require("express")
const server = express()
const fs = require("fs")

module.exports = {
    name: "webpanel",
    description: "Creates a web panel for interacting with the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("*", (req, res) => {
            return fs.readFileSync("./features/webpanel" + req.path.replace(/.\//g))
        })

        server.listen(process.env.PORT || 3000, () => { if (process.env.PORT || 3000 == 80) console.info("The webserver is running on http://localhost/\n"); else console.info("The server is running on http://localhost:" + (process.env.PORT || 3000) + "/\n") });
    }
}