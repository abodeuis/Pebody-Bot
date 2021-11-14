// shuffle.js
// Interal Files
const sendMessage = require("../send-message");
const guildsMap = require('../guildsMap.js');
// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'shuffle',
    desc : 'Shuffles the queue',
    help : 'Shuffles the queue\nExample usage \`{prefix}shuffle\`', // Replace prefix later
    execute(message) {
        guild_manager = server_map.get(message.guild.id)
        // Check if there is an active song_queue for this guild
        if (!guild_manager || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently playing', 30);
            return;
        }
        // If song is playing keep it in the first position
        if (guild_manager.player.state.status !== 'idle'){
            active_song = guild_manager.song_queue.shift();
            guild_manager.song_queue.sort(() => Math.random() - 0.5)
            guild_manager.song_queue.unshift(active_song);
        } else {
            guild_manager.song_queue.sort(() => Math.random() - 0.5)
        }
        
    }
};
