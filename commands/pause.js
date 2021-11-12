// pause.js
const sendMessage = require('../send-message')

module.exports = {
    name : 'pause',
    desc : 'Pauses the currently playing song',
    help : 'Pauses the currently playing song\nExample usage \`{prefix}pause\`', // Replace prefix later
    execute(message) {
        // TODO: implement Pause in ytdl version
        sendMessage(message.channel, 'Pause not currently implemented',-1)
    }
};