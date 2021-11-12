// queue.js
const sendMessage = require('../send-message')

var test_a, test_b;

module.exports = {
    name : 'queue',
    aliases : ['queue','q'],
    desc : 'Displays the queue in chat',
    help : 'Displays the queue in chat\nExample usage \`{prefix}queue\`', // Replace prefix later
    tests : [test_a, test_b],
    execute(message) {
        // TODO: implement Queue in ytdl version
        sendMessage(message.channel, 'Queue not currently implemented',-1)
    }
};

test_a = {
    name : 'example test true',
    expected_result : '', 
    execute(test_channel){
        test_channel.send(`Automated Test a`)
        return true
    }
}

test_b = {
    name : 'example test false',
    expected_result : '', 
    execute(test_channel){
        test_channel.send(`Automated Test b`)
        return false
    }
}