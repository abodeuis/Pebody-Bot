// play.js
const sendMessage = require('../send-message')
const utilities = require('../utilities')
const {	prefix, } = require('../config.json');
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

module.exports = {
    name : ['play','p'],
    desc : 'Adds a song to the queue; If there is no song playing, it will start playing',
    help : 'Accepts YouTube, Spotify or Soundcloud links as well as text. If given text will search YouTube for that title.\nExample usage \`{prefix}ping\`', // Replace prefix later
    async execute(message) {
        const args = message.content.slice(prefix.length).trim().split(' ')
  	    const msg_command = args.shift().toLowerCase()
	    distube.play(message, args.join(' '))

	    // #### Everything below this if just for the status msg ####
	    // Get queue state before song is added
	    let prequeue
	    try {
		    prequeue = distube.getQueue(message)
	    }
	    catch (err){
	    }
        if (typeof prequeue == 'undefined'){
            prequeue_length = 0
            prequeue = {songs : {length : 0}}
        }

        // Get queue state after song is added
        let queue
        let queue_length = 0
        while (prequeue_length === queue_length){
            const garbage = await utilities.fixeddelay() // Delay is nessacary becuase distube takes awhile to actually update the queue
            queue = distube.getQueue(message)
            if (typeof queue == 'undefined') {
                queue_length = 0
            }
            else {
                queue_length = queue.songs.length
            }
        }

        // Get amount of songs queued
        songsqueued = queue.songs.length - prequeue.songs.length

        // Multiple songs queued msg
        if (songsqueued > 1){
            sendMessage(message.channel, `Queued ${songsqueued} songs`, -1)
        }
        // Single song queued msg
        else {
            let song = queue.songs.at(-1)
            sendMessage(message.channel, `Queued ${song.name} : ${song.url} - \`${song.formattedDuration}\``, song.duration+10)
        }
    }
};