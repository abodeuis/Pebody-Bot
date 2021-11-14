// stop.js
// Internal Files
const sendMessage = require("../send-message");
const guildsMap = require('../guildsMap.js');
// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'stop',
    aliases : ['s'],
    desc : 'Stops the music',
    help : '\nExample usage \`{prefix}stop\`', // Replace prefix later
    execute(message) {
        guild_manager = server_map.get(message.guild.id)
        // Check if there is an active song_queue for this guild
        if (!guild_manager || !guild_manager.song_queue || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently playing');
            return;
        }
        // Stop the player and clear the queue
        guild_manager.player.stop();
        guild_manager.clearNowPlayingMsg();
        guild_manager.song_queue = [];
    }
};
