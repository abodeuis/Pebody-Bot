// myDistube.js
const { Client, Intents } = require('discord.js');
const DisTube = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require('@distube/spotify')
const { output_formats } = require('libsodium-wrappers');

// Config
const {prefix, token,} = require('./config.json');

// Connect to discord
module.exports = {
    distubeSingleton : (function () {
        var instance;

        function createInstance(){
            const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
            client.login(token);
            const distube = new DisTube.default(client,{
                emitNewSongOnly: true,
                plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
                /* // If you want more then a 100 spotify songs at once you need to sign in with a client id
                plugins: [new SpotifyPlugin({
                    parallel : true,
                    api : {
                        clientId: "",
                        clientSecret: "",
                    }
                })],
                */
            });
            return [client, distube];
        }

        return {getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
            }
        };   
    })()
}