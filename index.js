// External Package Requirements
const fs = require('fs');
// Internal Files
const sendMessage = require('./send-message')
const Client = require('./client.js')

// Load global variables
const client = Client.Singleton.getInstance()
const { prefix, } = require('./config.json');

// Load Commands from commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const command_map = new Map();
console.log(`Loading with ${commandFiles.length} commands :`)
for (const file of commandFiles){
	const cmd = require(`./commands/${file}`);
	// Add all aliases if they exist
	if (typeof cmd.aliases !== 'undefined'){
		for (i = 0; i < cmd.aliases.length; i++){
			console.log(`\t${cmd.name} as \'${cmd.aliases[i]}\'`)
			command_map.set(cmd.aliases[i], cmd)
		}
	}
	// If aliases doesn't exist add by name
	else {
		console.log(`\t${cmd.name}`)
		command_map.set(cmd.name, cmd)
	}
}
// Add help command here as it needs access to the command_map and i dont know how to scope that correctly
const help_wrapper = {
	name : 'help',
    desc : 'Provides Usage information about the avaliable commands',
    help : 'Example usage \`{prefix}help\`', // Replace prefix later
    execute(message) {
		const args = message.content.slice(prefix.length).trim().split(' ')

		if (args.length < 2){
			sendMessage(message.channel,`Default help message`, -1)
		}
		else {
			try {
				if (command_map.has(args[1])){
					cmd_func = command_map.get(args[1])
					sendMessage(message.channel,`${cmd_func.desc}\n${cmd_func.help}`, -1)
				}
				else {
					sendMessage(message.channel,`${args[1]} is not a command`)
				}
			}
			catch (err) {
				console.log(message, `ERROR : ${err}`)
				// Default m essage
				sendMessage(message.channel, `ERROR : ${err} \n Well thats not good :(`, -1)
			}
		}
	}
}
command_map.set('help', help_wrapper)

// Main Function. Activates whenever a message is posted in any channel it has access to
client.on('messageCreate', async message => {
    // Ignore non commands and bots
  	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
  	const args = message.content.slice(prefix.length).trim().split(' ')
  	const msg_command = args.shift().toLowerCase()

	// Check requirements for using the command
	
	// Ignore if user is not in a voice channel
	//const voice_channel = message.member.voice.channel;
	//if (!voice_channel){sendMessage(message.channel, "You need to be in a voice channel to execute this command")}
    // Check permissions for command

    // Log command in console
    log(message, `${message.member.displayName} issued command ${msg_command}`)

	// Check for command in map
	try {
		if (command_map.has(msg_command)){
			cmd_func = command_map.get(msg_command)
			cmd_func.execute(message)
		}
		else {
			sendMessage(message.channel, "You entered my command prefix, but i don't recognize the command", -1)
		}
	}
	catch (err) {
		console.log(message, `ERROR : ${err}`)
		// Default message
		sendMessage(message.channel, `ERROR : ${err} \n Well thats not good :(`, -1)
	}
})

// ##### Utility Functions #####
function log(message, string){
  const timestamp = new Date(message.createdTimestamp)
  console.log(`[${message.guild} : ${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}] ${string}`)
  console.log(`Full Message : ${message.content}`)
}

// Console Logs
client.once('ready', () => {
 //console.log(`Ready with ${command_map.size} commands loaded :`)
 for (const [key, value] of command_map.entries()) {
	 //console.log(`\t${key}`)
 }
 console.log('Logged In!');
});
client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});