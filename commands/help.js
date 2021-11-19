// stop.js
// Internal Files
const sendMessage = require("../send-message");
const CommandMap = require('../commandMap.js');

// Load global variables
const command_map = CommandMap.Singleton.getInstance();

module.exports = {
    name : 'help',
    aliases : ['h'],
    desc : 'Provides Usage information about the avaliable commands',
    help : 'Example usage \`{prefix}help\`', // Replace prefix later
    execute(message) {
        const args = message.content.split(' ')
    
        // General help msg
        if (args.length == 1){
            helpstr = 'Avaliable Commands : [] indicates an alias\n'; // Header
            for (let [key, cmd] of command_map){
                // Skip aliases as we don't want them to display as full commands
				if (typeof cmd.aliases !== 'undefined' && cmd.aliases.includes(key)){
					continue;
				}
                // Add the cmds name
				helpstr += `\t${cmd.name}`
				// If a command has aliases display them
				if (typeof cmd.aliases !== 'undefined'){
					helpstr += ' ['
					for (i = 0; i < cmd.aliases.length; i++){
						helpstr += `${cmd.aliases[i]},`
					}
					helpstr = helpstr.slice(0, helpstr.length - 1) // remove trailing ,
					helpstr += ']'
				}
				// Add the cmds descriptoin
				helpstr += ` : ${cmd.desc}\n`
            }
            // Send the full help msg
            sendMessage(message.channel,helpstr, -1)
        }
        // Specific command help message
        else {
            if (command_map.has(args[1])){
                cmd_func = command_map.get(args[1])
				sendMessage(message.channel,`${cmd_func.desc}\n${cmd_func.help}`, -1)
            }
            else {
                sendMessage(message.channel,`${args[1]} is not a command`)
            }
        }
    }
};

// Tests to be implemented
// +help
// +h
// +help play
// +help asdf
