// stop.js
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['stop','s'],
    desc : 'Stops the music',
    help : '\nExample usage \`{prefix}stop\`', // Replace prefix later
    execute(message) {
        distube.stop(message)
    }
};
