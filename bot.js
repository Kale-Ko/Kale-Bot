const Discord = require('discord.js')
const client = new Discord.Client()

var prefix = ">" 
var musicchannelid = "787509663100305468"
var modrollid = "787052727535927376"
var mutedroleid = "787054043029569537"
var status = "Use >help for help"
var statustype = "PLAYING"
var statusenabled = true

var bottoken = process.env.KALEBOTTOKEN

client.on('ready', () => {
    console.log("Bot Logged in as " + client.user.tag)

    if (statusenabled) {
        client.user.setActivity(status, { type: statustype })
    }
})

client.on("guildCreate", (guild) => {
    console.log("Joined server: " + guild.name)
})

client.on('message', message => {
    if (!message.author.bot && message.content.startsWith(prefix)) {
        if (message.content.startsWith(prefix + "about")) {
            sendembed(message.channel, "About", "Kale bot is a miscellaneous Discord bot made by Kale Ko, OrangeKale64#8048", "")
        } else if (message.content.startsWith(prefix + "help")) {
            sendembed(message.channel, "Help", "**Unranked**\nUse !help to show this\nUse !about to get info about the bot\n\n**Admins**\nUse !kick @username to kick someone from the server\nUse !ban @username to ban someone from the server\nUse !mute to mute someone so they can't talk\nUse !clear to clear a channels messages", "")
        } else if (message.content.startsWith(prefix + "music")) {
            var params = message.content.split(" ")
            var musicurl = params[1]

            if (musicurl == undefined) {
                sendembed(message.channel, "Music", "You must specify a song url to play", "https://static.thenounproject.com/png/928-200.png")
            } else {
                music.play(musicurl, musicchannelid)

                sendembed(message.channel, "Music", "Playing " + musicurl + " in the music channel", "https://static.thenounproject.com/png/928-200.png")
            }
        } else if (message.content.startsWith(prefix + "kick")) {
            if (message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) {
                const user = message.mentions.users.first()

                if (user) {
                    const member = message.guild.member(user)

                    if (member) {
                        member
                            .kick("They were bad!")
                            .then(() => {
                                sendembed(message.channel, "Kick", "Successfully kicked " + user.tag, "https://static.thenounproject.com/png/642338-200.png")

                                user.send('You were kicked from ' + message.guild.name)
                            })
                            .catch(err => {
                                sendembed(message.channel, "Kick", "I was unable to kick the member", "https://static.thenounproject.com/png/642338-200.png")

                                console.error(err)
                            })
                    } else {
                        sendembed(message.channel, "Kick", "That user isn't in this server!", "https://static.thenounproject.com/png/642338-200.png")
                    }
                } else {
                    sendembed(message.channel, "Kick", "You didn't mention the user to kick!", "https://static.thenounproject.com/png/642338-200.png")
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "ban")) {
            if (message.member.hasPermission('BAN_MEMBERS', { checkAdmin: true, checkOwner: true })) {
                const user = message.mentions.users.first()

                if (user) {
                    const member = message.guild.member(user)

                    if (member) {
                        member
                            .ban({
                                reason: 'They were bad!',
                            })
                            .then(() => {
                                sendembed(message.channel, "Ban", "Successfully banned " + user.tag, "https://static.thenounproject.com/png/1873121-200.png")

                                user.send('You were banned from ' + message.guild.name)
                            })
                            .catch(err => {
                                sendembed(message.channel, "Ban", "I was unable to ban the member", "https://static.thenounproject.com/png/1873121-200.png")

                                console.error(err)
                            })
                    } else {
                        sendembed(message.channel, "Ban", "That user isn't in this guild!", "https://static.thenounproject.com/png/1873121-200.png")
                    }
                } else {
                    sendembed(message.channel, "Ban", "You didn't mention the user to ban!", "https://static.thenounproject.com/png/1873121-200.png")
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "mute")) {
            if (message.member.hasPermission('MUTE_MEMBERS', { checkAdmin: true, checkOwner: true })) {
                const user = message.mentions.users.first()

                if (user) {
                    const member = message.guild.member(user)

                    if (member) {
                        member.roles.add(message.guild.roles.cache.get(mutedroleid))

                        sendembed(message.channel, "Mute", "Successfully muted " + user.tag, "https://static.thenounproject.com/png/136618-200.png")

                        user.send('You were muted in ' + message.guild.name)
                    } else {
                        sendembed(message.channel, "Mute", "That user isn't in this server!", "https://static.thenounproject.com/png/136618-200.png")
                    }
                } else {
                    sendembed(message.channel, "Mute", "You didn't mention the user to mute!", "https://static.thenounproject.com/png/136618-200.png")
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "unmute")) {
            if (message.member.roles.cache.has(modrollid)) {
                const user = message.mentions.users.first()

                if (user) {
                    const member = message.guild.member(user)

                    if (member) {
                        if (member.roles.cache.has(mutedroleid)) {
                            member.roles.remove(message.guild.roles.cache.get(mutedroleid))

                            sendembed(message.channel, "Unmute", "Successfully unmuted " + user.tag, "https://static.thenounproject.com/png/136618-200.png")
                        } else {
                            sendembed(message.channel, "Unmute", "That user isn't muted!", "")
                        }
                    } else {
                        sendembed(message.channel, "Unmute", "That user isn't in this server!", "https://static.thenounproject.com/png/136618-200.png")
                    }
                } else {
                    sendembed(message.channel, "Unmute", "You didn't mention the user to unmute!", "https://static.thenounproject.com/png/136618-200.png")
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "clear")) {
            if (message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
                async function clear() {
                    message.delete()

                    const fetched = await message.channel.messages.fetch({ limit: 100 })

                    message.channel.bulkDelete(fetched)
                }
                clear()
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else {
            sendembed(message.channel, "Unknown Command", "That is not a command, use !help for a list of commands", "")
        }
    }
})

client.login(bottoken)

function sendembed(channel, title, description, thumbnail) {
    const embed = new Discord.MessageEmbed()
    embed.setColor(0xffaa00)
    embed.setAuthor('Kale Bot', 'https://cdn.discordapp.com/avatars/786586380321947662/6f02784517f56af747c7a5de6094a836.png?size=128')
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setThumbnail(thumbnail)
    embed.setFooter('Kale Bot')
    embed.setTimestamp(new Date())

    channel.send(embed)
}

var music = function () { }
music.play = function (musicurl, musicchannelid) {
    const { getAudioDurationInSeconds } = require('get-audio-duration')

    const channel = client.channels.cache.get(musicchannelid)
    if (!channel) {
        console.log(musicchannelid + " is not a channel")
    } else {
        channel.join().then(connection => {
            function play() {
                console.log("Playing")
                getAudioDurationInSeconds(musicurl).then((duration) => {

                    const dispatcher = connection.play(musicurl, { volume: 0.1 })
                    setTimeout(() => {
                        play()
                    }, duration * 1000)
                })
            }
            play()
        })
    }
}

setTimeout(() => {
    music.play("music.mp3", "787509663100305468")
}, 1000)
