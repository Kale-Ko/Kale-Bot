const { data, uploadData } = require("../../features/data.js")
const { sendEmbed } = require("../../util.js")

module.exports = {
    name: "createreaction",
    description: "Create a reaction role",
    paramiters: [{ type: "paramiter", name: "message", description: "The message to add the reaction role to", kind: "string", optional: false }, { type: "paramiter", name: "role", description: "The role to give", kind: "role", optional: false }],
    requiredPermissions: ["MANAGE_ROLES"],
    worksInDms: false,
    callback: (message, args, client, config) => {

    }
}