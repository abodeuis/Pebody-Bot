// skip.js
// Interal Files
const sendMessage = require("../send-message");
const guildsMap = require('../guildsMap.js');
// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'skip',
    desc : 'Skips the currently playing track.',
    help : 'Skips to the next song in the queue\nExample usage \`{prefix}skip\`', // Replace prefix later
    execute(message) {
        guild_manager = server_map.get(message.guild.id)
        // Check if there is an active song_queue for this guild
        if (!guild_manager || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently playing', 30);
            return;
        }
        // Stop the player and clear the queue
        guild_manager.player.stop();
        guild_manager.song_queue.shift();
        guild_manager.play_songs();
    }
};