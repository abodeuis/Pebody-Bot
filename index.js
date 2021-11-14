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
	// Add main command call
	command_map.set(cmd.name, cmd)
	console.log(`\t${cmd.name}`)
	// Add aliases if they exist
	if (typeof cmd.aliases !== 'undefined'){
		for (i = 0; i < cmd.aliases.length; i++){
			console.log(`\t${cmd.name} aliased as \'${cmd.aliases[i]}\'`)
			command_map.set(cmd.aliases[i], cmd)
		}
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
			helpstr = 'Avaliable Commands : [] indicates an alias\n';
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
			sendMessage(message.channel,helpstr, -1)
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

    // Log message in console
    log(message, `${message.member.displayName} issued command ${msg_command}`)

	try {
		// Check for command in map
		if (command_map.has(msg_command)){
			// Get command
			cmd = command_map.get(msg_command)

			// Check requirements for using the command
			if (typeof cmd.requirements !== 'undefined'){
				// User in voice
				if (cmd.requirements.includes('user_in_voice_channel')){
					if (!message.member.voice.channel){
						sendMessage(message.channel, `You need to be in a voice channel to use ${msg_command} command!`, 30)
						return;
					}
				}
			}

			// Execute the command
			cmd.execute(message)
		}
		else {
			// Command wasn't in Map
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