// resume.js
const sendMessage = require('../send-message')

module.exports = {
    name : 'resume',
    aliases : ['resume','unpause'],
    desc : 'Resumes playback',
    help : 'Resumes playing a song if there was one paused\nExample usage \`{prefix}resume\`', // Replace prefix later
    execute(message) {
        // TODO: implement Resume in ytdl version
        sendMessage(message.channel, 'Resume not currently implemented',-1)
    }
};
