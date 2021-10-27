// shuffle.js
const sendMessage = require('../send-message')
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['shuffle'],
    desc : 'Shuffles the queue',
    help : 'Shuffles the queue\nExample usage \`{prefix}shuffle\`', // Replace prefix later
    execute(message) {
        distube.shuffle(message)
        let queue = distube.getQueue(message)
        let songcount = queue.songs.length
        sendMessage(message.channel, `Shuffled ${songcount} songs.`)
    }
};
