// seek.js
const sendMessage = require('../send-message')

module.exports = {
    name : 'seek',
    desc : 'Changes the currently playing song to play at the provided time.',
    help : 'Seeks in the current song to the provided time\nExample usage \`{prefix}seek\` 1:04', // Replace prefix later
    execute(message) {
        // TODO: implement Seek in ytdl version
        sendMessage(message.channel, 'Seek not currently implemented',-1)
    }
};