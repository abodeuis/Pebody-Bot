// queue.js
const sendMessage = require('../send-message')
const myDistube = require('../myDistube.js')
const distube = myDistube.distubeSingleton.getInstance()[1]

const test_a = {
    name : 'example test true',
    expected_result : '', 
    execute(test_channel){
        test_channel.send(`Automated Test a`)
        return true
    }
}

const test_b = {
    name : 'example test false',
    expected_result : '', 
    execute(test_channel){
        test_channel.send(`Automated Test b`)
        return false
    }
}

module.exports = {
    name : ['queue','q'],
    desc : 'Displays the queue in chat',
    help : 'Displays the queue in chat\nExample usage \`{prefix}queue\`', // Replace prefix later
    tests : [test_a, test_b],
    execute(message) {
        let queue = distube.getQueue(message)
        if (queue.songs.length > 5){
            sendMessage(message.channel, `Current queue:\n` +  queue.songs.slice(0,5).map((song, id) =>
                `**${id+1}**. \`${song.name} :\n ${song.url} - ${song.formattedDuration}\``
                ).join("\n") + `\nPlus and Additional ${queue.songs.length-5} songs`, 120);
        }
        else {
            sendMessage(message.channel, 'Current queue:\n' + queue.songs.map((song, id) =>
                `**${id+1}**. \`${song.name} :\n ${song.url} - ${song.formattedDuration}\``
                ).join("\n"), 120);
	    }
    }
};

