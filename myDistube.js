// Globals.js
const { Client, Intents } = require('discord.js');

// Config
const {prefix, token,} = require('./config.json');

// Connect to discord
module.exports = {
    discord_connection : (function () {
        var __instance;

        function createInstance(){
            const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
            client.login(token);
            return client;
        }

        return {getInstance: function () {
            if (!__instance) {
                __instance = createInstance();
            }
            return __instance;
            }
        };   
    })(),
    queue : (function () {
        var __queue;

        function create_queue(){
            const queue = new Map();
            return queue;
        }

        return {getInstance: function () {
            if (!__queue) {
                __queue = create_queue();
            }
            return __queue;
            }
        };
    })()
}