// echo.js
const sendMessage = require('../send-message')
const {	prefix, } = require('../config.json');

module.exports = {
    name : 'echo',
    desc : 'Replies with the any text after the command',
    help : 'Replies with the any text after the command.\nExample usage \`{prefix}echo This is the text I want pebody to say\`', // Replace prefix later
    execute(message) {
        const args = message.content.slice(prefix.length).trim().split(' ')
  	    const msg_command = args.shift() // Trim the command from the reply text 
	    sendMessage(message.channel, args.join(' '), -1)
    }
};