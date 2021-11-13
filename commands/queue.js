// queue.js

// Internal Files
const sendMessage = require('../send-message')
const guildsMap = require('../guildsMap.js');

// Load global variables
const server_map = guildsMap.Singleton.getInstance()

var test_a, test_b;

module.exports = {
    name : 'queue',
    aliases : ['queue','q'],
    desc : 'Displays the queue in chat',
    help : 'Displays the queue in chat\nExample usage \`{prefix}queue\`', // Replace prefix later
    tests : [test_a, test_b],
    execute(message) {
        guild_manager = server_map.get(message.guild.id)
        // Check if there is an active song_queue for this guild
        if (!guild_manager || !guild_manager.song_queue || guild_manager.song_queue.length == 0){
            sendMessage(message.channel, 'There is nothing currently in the queue.');
            return;
        }
        // Return the queue message
        if (guild_manager.song_queue.length > 5){
            sendMessage(message.channel, `Current queue:\n` +  guild_manager.song_queue.slice(0,5).map((song, id) =>
                `**${id+1}**. \`${song.title} :\n ${song.url}\``
                ).join("\n") + `\nPlus and Additional ${guild_manager.song_queue.length-5} songs`, 60);
        }
        else {
            sendMessage(message.channel, 'Current queue:\n' + guild_manager.song_queue.map((song, id) =>
                `**${id+1}**. \`${song.title} :\n ${song.url}\``
                ).join("\n"), 60);
        }
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