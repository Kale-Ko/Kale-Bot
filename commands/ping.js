module.exports = {
    name: "ping",
    description: "Ping Pong!",
    category: "",
    minArgs: 0,
    maxArgs: 0,
    slash: true,
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        return "Pong!"
    }
}