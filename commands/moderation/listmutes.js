const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "listmutes",
    description: "List all server mutes",
    paramiters: [],
    requiredPermissions: ["MANAGE_MESSAGES"],
    worksInDms: false,
    callback: (message, args, client, config) => {
        var mutedRole = message.guild.roles.cache.find(role => role.name == "Muted")
        if (mutedRole == null || mutedRole == undefined) { sendEmbed(message.channel, message.author, config, "Error", "There must be a role called 'Muted' in the server"); return }

        var mutes = ""

        mutedRole.members.forEach(memberid => {
            var member = message.guild.members.cache.find(member => member.id == memberid)

            mutes += member.user.username + "\n"
        })

        sendEmbed(message.channel, message.author, config, "Mutes", mutes)
    }
}