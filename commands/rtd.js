// rtd.js
// Internal Files
const sendMessage = require('../send-message')

module.exports = {
    name : 'rtd',
    desc : 'Rolls a \'N\' sided dice where N is the number provided',
    help : 'Rolls a \'N\' sided dice where N is the number provided', 
    execute(message) {
        const args = message.content.split(' ')
  	    args.shift()

        // Check for args to play
	    if (args.length < 1){
            sendMessage(message.channel, `You didn't give me a Dice size to roll`, 60);
            return;
        }
        N = Number(args[0])
        if(!isNaN(N)){
            diceroll = (Math.floor(Math.random() * N)+1)
            sendMessage(message.channel, `Dice roll is ${diceroll}`, -1);
        }
        else {
            sendMessage(message.channel, `Invalid value for dice size`, 60);
        }
    }
};