// stop.js
const sendMessage = require("../send-message");

module.exports = {
    name : 'stop',
    aliases : ['stop','s'],
    desc : 'Stops the music',
    help : '\nExample usage \`{prefix}stop\`', // Replace prefix later
    execute(message) {
        // TODO: implement Stop in ytdl version
        sendMessage(message.channel, 'Stop not currently implemented',-1)
    }
};
