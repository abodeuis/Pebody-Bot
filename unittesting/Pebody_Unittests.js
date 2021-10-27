// Pebody_Unittests.js
const fs = require('fs');
const { Client, Intents } = require('discord.js');
// const { output_formats } = require('libsodium-wrappers');

// Config
const {prefix, token, channel} = require('./unittest_config.json');

// Connect to discord
const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
client.login(token);
var channel_id

// Run command tests
function command_tests(){
    const commandFiles = fs.readdirSync('../commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const cmd = require(`../commands/${file}`);
        // Some commands might not have tests defined.
        if (typeof cmd.tests !== 'undefined') {
            for (let i=0; i<cmd.tests.length; i++){
                test_case = cmd.tests[i]
                console.log(`Test : ${test_case.name}`)
                var pass_state
                try {
                    pass_state = test_case.execute(channel_id)
                }
                catch (err) {
                    pass_state = false
                    console.log(`ERROR : ${err}\n`)
                }
            }
        }
    }
}

client.once('ready', () => {
    console.log('Logged In!');
    channel_id = client.channels.cache.get(channel)
    //console.log(channel_id)
    channel_id.send('Test message')
    command_tests()
});