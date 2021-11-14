// pause.js
// Internal Files
const sendMessage = require('../send-message')
const guildsMap = require('../guildsMap.js');
// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'pause',
    desc : 'Pauses the currently playing song',
    help : 'Pauses the currently playing song\nExample usage \`{prefix}pause\`', // Replace prefix later
    execute(message) {
        var guild_manager = server_map.get(message.guild.id);
        // Check if there is an active song_queue for this guild
        if (!guild_manager || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently playing.', 30);
            return;
        }
        // Pause the player
        guild_manager.clearNowPlayingMsg();
        guild_manager.player.pause();
    }
};