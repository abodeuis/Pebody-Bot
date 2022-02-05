// jerma.js
const sendMessage = require('../send-message')
const {	prefix, } = require('../config.json');
const guildsMap = require('../guildsMap.js');
const guildManager = require('../guildManager.js');
const { join } = require('path');

// Load global variables
const server_map = guildsMap.Singleton.getInstance()

const soundsPath = "./sounds/";
const jermaSounds = new Map([
    ["0", "zero.mp3"],
    ["1", "one.mp3"],
    ["a", "aa.mp3"],
    ["A", "aa_alt.mp3"],
    ["b", "sneeze.mp3"],
    ["c", "ooey.mp3"],
    ["e", "ee.mp3"],
    ["E", "ee_alt.mp3"],
    ["g", "gas.mp3"],
    ["G", "giantspider.mp3"],
    ["h", "whathappened.mp3"],
    ["i", "urAe.mp3"],
    ["j", "aj.mp3"],
    ["l", "aHHHHhwaheha.mp3"],
    ["m", "mmmnn.mp3"],
    ["n", "nya.mp3"],
    ["o", "oo.mp3"],
    ["O", "oo_alt.mp3"],
    ["p", "ooh whoopsie.mp3"],
    ["r", "nr.mp3"],
    ["R", "nr_alt.mp3"],
    ["s", "sphee.mp3"],
    ["t", "eeeuuu.mp3"],
    ["u", "ultra.mp3"],
    ["w", "ws.mp3"],
    ["W", "ws_alt.mp3"],
    ["y", "ayayaya.mp3"],
    ["Y", "you_missed.mp3"]
]);

module.exports = {
    name : 'jerma',
    desc : 'Plays jerma sounds',
    help : 'Plays jerma sounds', // Replace prefix later
    execute(message) {
        const args = message.content.slice(prefix.length).trim().split(' ')
  	    const msg_command = args.shift() // Trim the command from the reply text 
	    
        sendMessage(message.channel, `Jerma Soundboard is undergoing maintence :(`,-1);
        /*
        guild_manager = server_map.get(message.guild.id);
        // Construct manager if it doesn't exist yet
        if (!guild_manager){
            guild_manager = new guildManager(message);
            server_map.set(message.guild.id, guild_manager);
        }

        
        for (let str of args){
            for (let c of str){
                if (jermaSounds.has(c)){
                    guild_manager.addToQueue({title : (join(soundsPath, jermaSounds.get(c)))});
                }
            }
        }
        */
    }
};