const Discord = require("discord.js")
var { client } = require("./bot.js")

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
    embed.setAuthor(client.user.username, client.user.displayAvatarURL())
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setThumbnail(thumbnail)
    embed.setFooter(client.user.username)
    embed.setTimestamp(new Date())

    return embed
}

function uploadData() {

}

function downloadData() {
    var firebase = require("firebase-admin")

    const firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert(JSON.parse(process.env.FIREBACECERT)),
        databaseURL: "https://kale-bot-discord-default-rtdb.firebaseio.com"
    })
    const storage = firebase.storage(firebaseApp).bucket("gs://kale-bot-discord.appspot.com")
    const dataRef = storage.file("data.json")
    dataRef.download().then(newData => { console.log(newData) })

    return {}
}

module.exports = { sendEmbed, createEmbed, uploadData, downloadData }