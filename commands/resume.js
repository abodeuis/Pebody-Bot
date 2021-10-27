// resume.js
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['resume','unpause'],
    desc : 'Resumes playback',
    help : 'Resumes playing a song if there was one paused\nExample usage \`{prefix}resume\`', // Replace prefix later
    execute(message) {
        distube.resume(message)
    }
};
