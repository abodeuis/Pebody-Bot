// seek.js
const utilities = require('../utilities')
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['seek'],
    desc : 'Changes the currently playing song to play at the provided time.',
    help : 'Seeks in the current song to the provided time\nExample usage \`{prefix}seek\` 1:04', // Replace prefix later
    execute(message) {
        const args = message.content.slice(prefix.length).trim().split(' ')
        const msg_command = args.shift().toLowerCase()
        time = utilities.timestampToSec(args[0])
        distube.seek(message, timestampToSec(args[0]))
    }
};