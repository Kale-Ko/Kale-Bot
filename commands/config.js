module.exports = {
    name: "config",
    description: "Get info about the bot",
    category: "Management",
    subCommands: [{ name: "get", description: "Get all the current config", paramiters: ["name"], requiredPermissions: [], }],
    paramiters: [],
    requiredPermissions: [],
    worksInDms: false,
    callback: (message, args, client, config) => { }
}