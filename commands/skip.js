// skip.js
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['skip'],
    desc : 'Skips the currently playing track.',
    help : 'Skips to the next song in the queue\nExample usage \`{prefix}skip\`', // Replace prefix later
    execute(message) {
        distube.skip(message)
    }
};