const Discord = require('discord.js');
const client = new Discord.Client();
var firebase = require('firebase');
firebase.initializeApp({
    apiKey: "AIzaSyDJZAe3wLHxAGyP20_tps9M2PwATKBeNm0",
    authDomain: "kale-bot.firebaseapp.com",
    projectId: "kale-bot",
    storageBucket: "kale-bot.appspot.com",
    messagingSenderId: "653348399347",
    appId: "1:653348399347:web:9a738d13c9170bf61bef86"
});
var database = firebase.database();

var bottoken = process.env.KALEBOTTOKEN
console.log(bottoken)
database.ref('/').once('value').then((snapshot) => {
    var fullconfig = snapshot.val();
    var status = fullconfig.status;
    var statustype = fullconfig.statustype;
    var statusenabled = fullconfig.statusenabled;
    var bindtoport = fullconfig.bindtoport;

    client.on('ready', () => {
        console.log("Bot Logged in as " + client.user.tag);
        //sendembed(client.channels.cache.get("787053542460227624"), "Restarted/update", "The Bot has restarted/updated", "")

        if (statusenabled) {
            client.user.setActivity(status, { type: statustype })
        }
    });



    client.on("guildCreate", (guild) => {
        console.log("Joined server: " + guild.name);
    })



    client.on('message', message => {
        database.ref('servers/' + message.guild.id).once('value').then((snapshot) => {
            var config = snapshot.val()
            var prefix = config.prefix;
            var allowcommandsinallchannels = config.allowcommandsinallchannels;
            var multiblebots = config.multiblebots
            var botcommandschannelid = config.botcommandschannelid;
            var musicchannelid = config.musicchannelid;
            var modrollid = config.modrollid;
            var mutedroleid = config.mutedroleid;
            var deletecommands = config.deletecommands;
            var deletecommandstimeout = config.deletecommandstimeout;
            var deleteresponses = config.deleteresponses;
            var deleteresponsestimeout = config.deleteresponsestimeout;

            if (message.author.bot) return;
            if (message.content.startsWith(prefix)) {
                if (message.channel == botcommandschannelid) {
                    commands(message, config)
                } else {
                    if (allowcommandsinallchannels) {
                        commands(message, config)
                    } else {
                        var newmessage = sendembed(message.channel, "Denied", "You can only use bot commands in #bot-commands", "https://static.thenounproject.com/png/372212-200.png")
                        message.delete()
                        if (deleteresponses) {
                            newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
                        }
                    }
                }
            } else {
                if (message.channel == botcommandschannelid) {
                    if (multiblebots == false) {
                        var newmessage = sendembed(message.channel, "Denied", "You can't chat in #bot-commands, it is only for commands", "https://static.thenounproject.com/png/372212-200.png")
                        message.delete()
                        if (deleteresponses) {
                            newmessage.delete({ timeout: 2000 })
                        }
                    }
                }
            }
        });
    });



    client.login(bottoken);



    function commands(message, config) {
        var prefix = config.prefix;
        var allowcommandsinallchannels = config.allowcommandsinallchannels;
        var multiblebots = config.multiblebots
        var botcommandschannelid = config.botcommandschannelid;
        var musicchannelid = config.musicchannelid;
        var modrollid = config.modrollid;
        var mutedroleid = config.mutedroleid;
        var deletecommands = config.deletecommands;
        var deletecommandstimeout = config.deletecommandstimeout;
        var deleteresponses = config.deleteresponses;
        var deleteresponsestimeout = config.deleteresponsestimeout;

        if (message.content.startsWith(prefix + "about")) {
            var newmessage = sendembed(message.channel, "About", "Kale bot is a miscellaneous Discord bot made by Kale Ko, OrangeKale64#8048", "")
            if (deletecommands) {
                message.delete({ timeout: deletecommandstimeout * 1000 })
            }
            if (deleteresponses) {
                newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
            }
        } else if (message.content.startsWith(prefix + "help")) {
            var newmessage = sendembed(message.channel, "Help", "**Unranked**\nUse !help to show this\nUse !about to get info about the bot\n\n**Admins**\nUse !kick @username to kick someone from the server\nUse !ban @username to ban someone from the server\nUse !mute to mute someone so they can't talk\nUse !clear to clear a channels messages", "")
            if (deletecommands) {
                message.delete({ timeout: deletecommandstimeout * 1000 })
            }
            if (deleteresponses) {
                newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
            }
        } else if (message.content.startsWith(prefix + "music")) {
            var params = message.content.split(" ")
            var musicurl = params[1]
            if (musicurl == undefined) {
                var newmessage = sendembed(message.channel, "Music", "You must specify a song url to play", "https://static.thenounproject.com/png/928-200.png")
            } else {
                music.play(musicurl, musicchannelid)
                var newmessage = sendembed(message.channel, "Music", "Playing " + musicurl + " in the music channel", "https://static.thenounproject.com/png/928-200.png")
            }
            if (deletecommands) {
                message.delete({ timeout: deletecommandstimeout * 1000 })
            }
            if (deleteresponses) {
                newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
            }
        } else if (message.content.startsWith(prefix + "kick")) {
            if (message.member.roles.cache.has(modrollid)) {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member
                            .kick("They were bad!")
                            .then(() => {
                                var newmessage = sendembed(message.channel, "Kick", "Successfully kicked " + user.tag, "https://static.thenounproject.com/png/642338-200.png")
                                user.send('You were kicked from ' + message.guild.name)
                            })
                            .catch(err => {
                                var newmessage = sendembed(message.channel, "Kick", "I was unable to kick the member", "https://static.thenounproject.com/png/642338-200.png")
                                console.error(err);
                            });
                    } else {
                        var newmessage = sendembed(message.channel, "Kick", "That user isn't in this server!", "https://static.thenounproject.com/png/642338-200.png")
                    }
                } else {
                    var newmessage = sendembed(message.channel, "Kick", "You didn't mention the user to kick!", "https://static.thenounproject.com/png/642338-200.png")
                }
                if (deletecommands) {
                    message.delete({ timeout: deletecommandstimeout * 1000 })
                }
                if (deleteresponses) {
                    newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "ban")) {
            if (message.member.roles.cache.has(modrollid)) {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member
                            .ban({
                                reason: 'They were bad!',
                            })
                            .then(() => {
                                var newmessage = sendembed(message.channel, "Ban", "Successfully banned " + user.tag, "https://static.thenounproject.com/png/1873121-200.png")
                                user.send('You were banned from ' + message.guild.name)
                            })
                            .catch(err => {
                                var newmessage = message.reply('I was unable to ban the member'); sendembed(message.channel, "Ban", "I was unable to ban the member", "https://static.thenounproject.com/png/1873121-200.png")
                                console.error(err);
                            });
                    } else {
                        var newmessage = message.reply("That user isn't in this guild!"); sendembed(message.channel, "Ban", "That user isn't in this guild!", "https://static.thenounproject.com/png/1873121-200.png")
                    }
                } else {
                    var newmessage = message.reply("You didn't mention the user to ban!"); sendembed(message.channel, "Ban", "You didn't mention the user to ban!", "https://static.thenounproject.com/png/1873121-200.png")
                }
                if (deletecommands) {
                    message.delete({ timeout: deletecommandstimeout * 1000 })
                }
                if (deleteresponses) {
                    newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "mute")) {
            if (message.member.roles.cache.has(modrollid)) {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member.roles.add(message.guild.roles.cache.get(mutedroleid))
                        var newmessage = sendembed(message.channel, "Mute", "Successfully muted " + user.tag, "https://static.thenounproject.com/png/136618-200.png")
                        user.send('You were muted in ' + message.guild.name)
                    } else {
                        var newmessage = sendembed(message.channel, "Mute", "That user isn't in this server!", "https://static.thenounproject.com/png/136618-200.png")
                    }
                } else {
                    var newmessage = sendembed(message.channel, "Mute", "You didn't mention the user to mute!", "https://static.thenounproject.com/png/136618-200.png")
                }
                if (deletecommands) {
                    message.delete({ timeout: deletecommandstimeout * 1000 })
                }
                if (deleteresponses) {
                    newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "unmute")) {
            if (message.member.roles.cache.has(modrollid)) {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        if (member.roles.cache.has(mutedroleid)) {
                            member.roles.remove(message.guild.roles.cache.get(mutedroleid))
                            var newmessage = sendembed(message.channel, "Unmute", "Successfully unmuted " + user.tag, "https://static.thenounproject.com/png/136618-200.png")
                        } else {
                            sendembed(message.channel, "Unmute", "That user isn't muted!", "")
                        }
                    } else {
                        var newmessage = sendembed(message.channel, "Unmute", "That user isn't in this server!", "https://static.thenounproject.com/png/136618-200.png")
                    }
                } else {
                    var newmessage = sendembed(message.channel, "Unmute", "You didn't mention the user to unmute!", "https://static.thenounproject.com/png/136618-200.png")
                }
                if (deletecommands) {
                    message.delete({ timeout: deletecommandstimeout * 1000 })
                }
                if (deleteresponses) {
                    newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
                }
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else if (message.content.startsWith(prefix + "clear")) {
            if (message.member.roles.cache.has(modrollid)) {
                async function clear() {
                    message.delete();
                    const fetched = await message.channel.messages.fetch({ limit: 100 });
                    message.channel.bulkDelete(fetched);
                }
                clear();
            } else {
                sendembed(message.channel, "Denied", "You do not have the permission to do that", "https://static.thenounproject.com/png/372212-200.png")
            }
        } else {
            sendembed(message.channel, "Unknown Command", "That is not a command, use !help for a list of commands", "")
            if (deletecommands) {
                message.delete({ timeout: deletecommandstimeout * 1000 })
            }
            if (deleteresponses) {
                newmessage.delete({ timeout: deleteresponsestimeout * 1000 })
            }
        }
    }



    if (bindtoport) {
        const express = require('express');
        const path = require('path');
        const app = express();
        const port = process.env.PORT || 5000;

        //https://the-kale-bot.herokuapp.com/update/?serverid=&prefix=&allowcommandsinallchannels=&botcommandschannelid=&musicchannelid=&modrollid=&mutedroleid=&deletecommands=&deletecommandstimeout=&deleteresponses=&deleteresponsestimeout=
        //https://the-kale-bot.herokuapp.com/update/?serverid=787052330129686560&prefix=!&allowcommandsinallchannels=true&botcommandschannelid=787053542460227624&musicchannelid=787509663100305468&modrollid=787052727535927376&mutedroleid=787054043029569537&deletecommands=false&deletecommandstimeout=3&deleteresponses=false&deleteresponsestimeout=5

        app.get('*', (req, res) => {
            /*var contents;
            var reqpath = req.url
            reqpath = reqpath.replace('/', '');
            var action = reqpath.substr(0, reqpath.indexOf("?") - 1)
            var params = reqpath.substr(reqpath.indexOf("?"))
            params = new URLSearchParams(params)

            var serverid = params.get("serverid")

            if (action == "fetch") {
                var contents = JSON.stringify(fullconfig[serverid])
            } else if (action = "update") {
                var config = {
                    "prefix": params.get("prefix"),
                    "allowcommandsinallchannels": params.get("allowcommandsinallchannels"),
                    "multiblebots": params.get("multiblebots"),
                    "botcommandschannelid": params.get("botcommandschannelid"),
                    "musicchannelid": params.get("musicchannelid"),
                    "modrollid": params.get("modrollid"),
                    "mutedroleid": params.get("mutedroleid"),
                    "deletecommands": params.get("deletecommands"),
                    "deletecommandstimeout": params.get("deletecommandstimeout"),
                    "deleteresponses": params.get("deleteresponses"),
                    "deleteresponsestimeout": params.get("deleteresponsestimeout")
                }
                database.ref('servers/' + serverid).set(config);
            }*/

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end("Online", "utf8");
        });

        app.listen(port, () => console.log("Bound to port " + port));
    }



    function sendembed(channel, title, description, thumbnail) {
        const embed = new Discord.MessageEmbed()
        embed.setColor(0xffaa00);
        embed.setAuthor('Kale Bot', 'https://cdn.discordapp.com/avatars/786586380321947662/6f02784517f56af747c7a5de6094a836.png?size=128');
        embed.setTitle(title);
        embed.setDescription(description);
        embed.setThumbnail(thumbnail)
        embed.setFooter('Kale Bot')
        embed.setTimestamp(new Date())

        channel.send(embed);
    }



    var music = function () { }
    music.play = function (musicurl, musicchannelid) {
        const { getAudioDurationInSeconds } = require('get-audio-duration');

        const channel = client.channels.cache.get(musicchannelid);
        if (!channel) {
            console.log(musicchannelid + " is not a channel")
        } else {
            channel.join().then(connection => {
                function play() {
                    console.log("Playing")
                    getAudioDurationInSeconds(musicurl).then((duration) => {

                        const dispatcher = connection.play(musicurl, { volume: 0.1 });
                        setTimeout(() => {
                            play()
                        }, duration * 1000);
                    });
                }
                play()
            })
        }
    }

    setTimeout(() => {
        music.play("music.mp3", "787509663100305468")
    }, 1000);
});
