var games = new Map()
var invites = new Map()

class RPSGame {
    user1
    user2

    constructor(user1, user2) {
        this.user1 = user1
        this.user2 = user2
    }
}

module.exports = {
    name: "rps",
    description: "Manage rock paper scissors games",
    events: ["message"],
    run: (name, message) => { },
    isInvite: (user1, user2) => { if (invites.has(user1)) { return invites.get(user1) == user2 } else return false },
    createInvite: (user1, user2) => { invites.set(user1, user2) },
    acceptInvite: (user1, user2) => { if (invites.get(user1) == user2) invites.delete(user1) },
    createGame: (user1, user2) => { games.set([user1, user2], new RPSGame(user1, user2)) },
    games,
    invites
}