// resume.js
// Internal Files
const sendMessage = require('../send-message')
const guildsMap = require('../guildsMap.js');
// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'resume',
    aliases : ['unpause'],
    desc : 'Resumes playback',
    help : 'Resumes playing a song if there was one paused\nExample usage \`{prefix}resume\`', // Replace prefix later
    execute(message) {
        var guild_manager = server_map.get(message.guild.id);
        if (!guild_manager || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently in the queue.', 30);
            return;
        }
        // unpause
        guild_manager.setNowPlayingMsg();
        guild_manager.player.unpause();
    }
};
