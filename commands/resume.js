// resume.js
const sendMessage = require('../send-message')
const guildsMap = require('../guildsMap.js');
const guilds_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'resume',
    aliases : ['unpause'],
    desc : 'Resumes playback',
    help : 'Resumes playing a song if there was one paused\nExample usage \`{prefix}resume\`', // Replace prefix later
    execute(message) {
        // TODO: implement Resume in ytdl version
        sendMessage(message.channel, 'Resume not currently implemented',-1)
        var guild_manager = guilds_map.get(message.guild.id);
        guild_manager.player.unpause();
    }
};
