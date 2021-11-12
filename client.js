// client.js
const { Client, Intents } = require('discord.js');

// Config
const {prefix, token,} = require('./config.json');

module.exports = {
    // Connect to discord
    Singleton : (function () {
        var _instance;

        function _createClient(){
            const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
            client.login(token);
            return client;
        }

        return {getInstance: function () {
            if (!_instance) {
                _instance = _createClient();
            }
            return _instance;
            }
        };   
    })()
}