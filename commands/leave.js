// leave.js
const sendMessage = require("../send-message");
const guildsMap = require('../guildsMap.js');


// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'leave',
    desc : 'leaves the voice channel',
    help : '\nExample usage \`{prefix}leave\`', // Replace prefix later
    execute(message) {
        guild_manager = server_map.get(message.guild.id)
        // Check if there is an active song_queue for this guild
        if (guild_manager){
            guild_manager.destroy()
        }
        server_map.delete(message.guild.id)
   }
};