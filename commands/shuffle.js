// shuffle.js
const sendMessage = require('../send-message')

module.exports = {
    name : 'shuffle',
    desc : 'Shuffles the queue',
    help : 'Shuffles the queue\nExample usage \`{prefix}shuffle\`', // Replace prefix later
    execute(message) {
        // TODO: implement Shuffle in ytdl version
        sendMessage(message.channel, 'Shuffle not currently implemented',-1)
    }
};
