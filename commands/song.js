// song.js
// Internal Files
const sendMessage = require('../send-message')
const guildsMap = require('../guildsMap.js');
const { format_duration } = require('../utilities.js')
// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'song',
    desc : 'Gives information about the currently playing song',
    help : 'Gives the current postion of the song\nExample usage \`{prefix}pause\`', // Replace prefix later
    execute(message) {
        var guild_manager = server_map.get(message.guild.id);
        // Check if there is an active song_queue for this guild
        if (!guild_manager || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently playing.', 30);
            return;
        }
        // Send the song information
        const current_pos = guild_manager.current_audio.playbackDuration/1000
        var song_msg = `Now Playing : ${guild_manager.song_queue[0].title}\n`
        song_msg += `${format_duration(current_pos)}/${format_duration(guild_manager.song_queue[0].duration)}`
        sendMessage(message.channel, song_msg, (guild_manager.song_queue[0].duration - current_pos));
    }
};