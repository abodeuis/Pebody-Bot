// pong.js
const sendMessage = require('../send-message')

module.exports = {
    name : ['pong'],
    desc : 'Replies with Ping',
    help : 'Replies with Ping.\nExample usage \`{prefix}pong\`', // Replace prefix later
    execute(message) {
        sendMessage(message.channel, "Ping", 30);
    }
};