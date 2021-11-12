// skip.js
const sendMessage = require("../send-message");

module.exports = {
    name : 'skip',
    desc : 'Skips the currently playing track.',
    help : 'Skips to the next song in the queue\nExample usage \`{prefix}skip\`', // Replace prefix later
    execute(message) {
        // TODO: implement Skip in ytdl version
        sendMessage(message.channel, 'Skip not currently implemented',-1)
    }
};