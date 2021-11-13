// play.js
// External Package Requirements
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

// Internal Files
const sendMessage = require('../send-message')
const utilities = require('../utilities')
const {	prefix, } = require('../config.json');
const guildsMap = require('../guildsMap.js');
const guildManager = require('../guildManager.js');

// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'play',
    aliases : ['play','p'],
    desc : 'Adds a song to the queue; If there is no song playing, it will start playing',
    help : 'Accepts YouTube, Spotify or Soundcloud links as well as text. If given text will search YouTube for that title.\nExample usage \`{prefix}ping\`', // Replace prefix later
    requirements : ['user_in_voice_channel'],
    async execute(message) {
        const args = message.content.slice(prefix.length).trim().split(' ');
  	    args.shift(); // remove the command part of the msg
        
        // Check for args to play
	    if (args.length < 1){
            sendMessage(message.channel, `You didn't give me anything to play`, -1);
            return;
        }

        // Check if arg is a valid url
        if(ytdl.validateURL(args[0])){
            const song_info = await ytdl.getInfo(args[0]);
            song = {title : song_info.videoDetails.title, url: song_info.videoDetails.video_url }
        } 
        // Search for args if it isn't a url
        else {
            const video_finder = async (query) =>{
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await video_finder(args.join(' '));
            if (video){
                song = {title : video.title, url : video.url}
            } else {
                sendMessage(message.channel, `error finding video`, -1);
            }
        }

        guild_manager = server_map.get(message.guild.id)
        // Construct manager if it doesn't exist yet
        if (!guild_manager){
            guild_manager = new guildManager(message);
            server_map.set(message.guild.id, guild_manager);
        }
        // Add song to queue
        guild_manager.song_queue.push(song)
        // Connect to channel if its not all ready active
        if (guild_manager.connection === null){
            guild_manager.connectToChannel(message.member.voice.channel);
        }
        console.log(guild_manager.player.state.status)
        //
        if (guild_manager.player.state.status === 'idle'){
            guild_manager.play_songs();
        }
        
        sendMessage(guild_manager.text_channel, `song ${song.title} added to queue`)    
    }
};

const video_player = async (guild, song) => {
    const song_queue = server_map.get(guild.id);

    if (!song){
        song_queue.voice_channel.leave();
        server_map.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, {filter:'audioonly'});
    song_queue.connection.playStream(stream, {seek :0, volume:0.5}).on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`now playing ${song.title}`)
}