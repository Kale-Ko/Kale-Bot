/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const express = require("express")
const server = express()

module.exports = {
    name: "webpage",
    description: "Creates a simple status page for the bot",
    events: ["register"],
    run: (name, event) => {
        server.get("*", (req, res) => {
            res.statusCode = 200
            res.statusMessage = "Ok"

            res.end("200 Ok")
        })

        server.listen(process.env.PORT || 3000, () => { })
    }
}