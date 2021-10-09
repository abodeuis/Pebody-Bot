// ping.js
const sendMessage = require('../send-message')

module.exports = {
    name : ['ping'],
    desc : 'Replies with Pong',
    help : 'Replies with Pong.\nExample usage \`{prefix}ping\`', // Replace prefix later
    execute(message) {
        sendMessage(message.channel, "Pong", 30);
    }
};