const Discord = require("discord.js")
const fs = require("fs")
var env = {}
fs.stat("./env.json", (err, stats) => { if (!err) env = require("./env.json") })

const firebase = require("firebase-admin")
const firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert((process.env.FIREBACECERT || JSON.stringify(env.FIREBACECERT)).startsWith("{") ? JSON.parse(process.env.FIREBACECERT || JSON.stringify(env.FIREBACECERT)) : JSON.parse(fs.readFileSync(process.env.FIREBACECERT))),
    databaseURL: "https://kale-bot-discord-default-rtdb.firebaseio.com"
})
const storage = firebase.storage(firebaseApp).bucket("gs://kale-bot-discord.appspot.com")

function sendEmbed(channel, author, config, title, description, thumbnail) {
    if (config.atsender) {
        channel.send("<@" + author.id + ">\n", { embed: createEmbed(title, description, thumbnail) })
    } else {
        channel.send(createEmbed(title, description, thumbnail))
    }
}

function createEmbed(title, description, thumbnail) {
    const embed = new Discord.MessageEmbed()
    embed.setColor(0xffaa00)
    embed.setAuthor(require("./bot.js").client.user.username, require("./bot.js").client.user.displayAvatarURL())
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setThumbnail(thumbnail)
    embed.setFooter(require("./bot.js").client.user.username)
    embed.setTimestamp(new Date())

    return embed
}

function uploadData() {
    storage.file("data.json").save(JSON.stringify(require("./bot.js").data, null, 4))
}

function downloadData(callback) {
    storage.file("data.json").download().then(newData => { callback(JSON.parse(newData)) }).catch(err => { throw err })
}

module.exports = { sendEmbed, createEmbed, uploadData, downloadData }