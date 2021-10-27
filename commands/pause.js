// pause.js
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['pause'],
    desc : 'Pauses the currently playing song',
    help : 'Pauses the currently playing song\nExample usage \`{prefix}pause\`', // Replace prefix later
    execute(message) {
        distube.pause(message)
    }
};