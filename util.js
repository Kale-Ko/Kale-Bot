const Discord = require("discord.js")

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
    console.log("Upload")
}

async function downloadData(callback) {
    var firebase = require("firebase-admin")

    const firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert(JSON.parse(process.env.FIREBACECERT)),
        databaseURL: "https://kale-bot-discord-default-rtdb.firebaseio.com"
    })

    const storage = firebase.storage(firebaseApp).bucket("gs://kale-bot-discord.appspot.com")
    const dataRef = storage.file("data.json")

    dataRef.download().then(newData => { callback(JSON.parse(newData)) }).catch(err => { throw err })
}

module.exports = { sendEmbed, createEmbed, uploadData, downloadData }