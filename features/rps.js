const { sendEmbed } = require("../util.js")

var games = new Map()
var invites = new Map()

class RPSGame {
    user1
    user2

    user1Option
    user2Option

    constructor(user1, user2) {
        this.user1 = user1
        this.user2 = user2
    }

    setUserOption = { "1": this.setUser1Option, "2": this.setUser2Option }
    setUser1Option(option) { this.user1Option = option }
    setUser2Option(option) { this.user2Option = option }

    getWinner() {
        if (this.user1Option == undefined || this.user2Option == undefined) return "-1"

        if (this.user1Option == "rock" && this.user2Option == "rock") return "0"
        if (this.user1Option == "rock" && this.user2Option == "paper") return "2"
        if (this.user1Option == "rock" && this.user2Option == "scissors") return "1"
        if (this.user1Option == "paper" && this.user2Option == "rock") return "1"
        if (this.user1Option == "paper" && this.user2Option == "paper") return "0"
        if (this.user1Option == "paper" && this.user2Option == "scissors") return "2"
        if (this.user1Option == "scissors" && this.user2Option == "rock") return "2"
        if (this.user1Option == "scissors" && this.user2Option == "paper") return "1"
        if (this.user1Option == "scissors" && this.user2Option == "scissors") return "0"
    }
}

module.exports = {
    name: "rps",
    description: "Manage rock paper scissors games",
    events: ["message"],
    run: (name, message) => {
        console.log(module.exports.getGame(message.author))

        if (message.channel.name == message.author.username.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()) {
            if (module.exports.getGame(message.author) != undefined) {
                if (message.content == "rock" || message.content == "paper" || message.content == "scissors") {
                    module.exports.getGame(message.author).game.setUserOption[module.exports.getGame(message.author).user](message.content)

                    sendEmbed(message.channel, message.author, { atSender: false }, "Successful", "Successfully set your answer to " + message.content)

                    setTimeout(() => { message.channel.delete() }, 2000)
                } else {
                    sendEmbed(message.channel, message.author, { atSender: false }, "Error", "You must enter rock, paper, or scissors")
                }
            } else {
                sendEmbed(message.channel, message.author, { atSender: false }, "Error", "You are not playing a game")
            }
        }
    },
    isInvite: (user1, user2) => { if (invites.has(user1)) { return invites.get(user1) == user2 } else return false },
    createInvite: (user1, user2) => { invites.set(user1, user2) },
    deleteInvite: (user1, user2) => { if (invites.get(user1) == user2) invites.delete(user1) },
    createGame: (user1, user2) => { games.set([user1, user2], new RPSGame(user1, user2)); return games.get([user1, user2]) },
    getGame: user => { games.forEach((value, [user1, user2]) => { if (user1.id == user.id) return { game: value, user: "1" }; else if (user2.id == user.id) return { game: value, user: "2" } }) },
    finishGame: (user1, user2) => { var winner = games.get([user1, user2]).getWinner(); games.delete([user1, user2]); return winner },
    games,
    invites
}