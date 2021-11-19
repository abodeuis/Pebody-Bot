// play.js
// External Package Requirements
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const ytSearch = require('yt-search');

// Internal Files
const sendMessage = require('../send-message')
const { format_duration } = require('../utilities')
const {	prefix, } = require('../config.json');
const guildsMap = require('../guildsMap.js');
const guildManager = require('../guildManager.js');

// Load global variables
const server_map = guildsMap.Singleton.getInstance()

module.exports = {
    name : 'play',
    aliases : ['p'],
    desc : 'Adds a song to the queue; If there is no song playing, it will start playing',
    help : 'Accepts YouTube links as well as text. If given text will search YouTube for that title.\nExample usage \`{prefix}ping\`', // Replace prefix later
    requirements : ['user_in_voice_channel'],
    async execute(message) {
        const args = message.content.split(' ');
  	    args.shift(); // remove the command part of the msg
        
        // Check for args to play
	    if (args.length < 1){
            sendMessage(message.channel, `You didn't give me anything to play`, 60);
            return;
        }

        // ##### Resolve the provided args to a URL(s) #####
        var song_requests = [];

        // Check for spotify URL
        if(args[0].startsWith("https://open.spotify.com")){
            sendMessage(message.channel, `Spotify links are not supported, but are planned to be supported in the future`, -1);
            return;
        }
        // Check for soundcloud URL
        if(args[0].startsWith("https://soundcloud.com")){
            sendMessage(message.channel, `Soundcloud links are not supported, but are planned to be supported in the future`, -1);
            return;
        }
        // Check for Youtube video URL
        if(ytdl.validateURL(args[0])){
            const song_info = await ytdl.getInfo(args[0]);
            song_requests.push({title : song_info.videoDetails.title, url: song_info.videoDetails.video_url, duration: song_info.videoDetails.lengthSeconds, seek : 0 })
        }
        // Check for Youtube playlist URL
        // Need to figure out a better way to check for youtube playlist links!
        else if(args[0].startsWith("https")){
            // Get playlistID returns an exception of no id found if there isn't a valid playlist for the url
            try {
                const playlistid = await ytpl.getPlaylistID(args[0])
                const playlistQuery = await ytpl(playlistid, {pages : 10}) // 10 Pages will return a max of a 100 videos
                for (let i in playlistQuery.items){
                    // Validate will make sure that we can get the url as private videos might be in playlists
                    if(ytdl.validateURL(playlistQuery.items[i].shortUrl)){
                        const song_info = await ytdl.getInfo(playlistQuery.items[i].shortUrl);
                        song_requests.push({title : song_info.videoDetails.title, url: song_info.videoDetails.video_url, duration: song_info.videoDetails.lengthSeconds, seek : 0 })
                    }
                }
            }
            catch (err) {
                console.log(`WARNING : Could not resolve ${args[0]} to a video`)
                sendMessage(message.channel, `Could not resolve the URL to a video (video type may not be supported)`, -1);
                return;
            }
        }
        // Search Youtube for args as a string if it isn't a url
        else {
            const video_finder = async (query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await video_finder(args.join(' '));
            if (video){
                song_requests.push({title : video.title, url : video.url, duration : video.seconds, seek : 0})
            } else {
                console.log(`WARNING : Could not find video for ${args[0]}`)
                sendMessage(message.channel, `Could not find a video`, -1);
                return;
            }
        }

        // ##### Submit the song to the Guild Manager #####
        guild_manager = server_map.get(message.guild.id)
        // Construct manager if it doesn't exist yet
        if (!guild_manager){
            guild_manager = new guildManager(message);
            server_map.set(message.guild.id, guild_manager);
        }
        // Add songs to queue
        for (let i in song_requests){
            console.log(`\tAdding ${song_requests[i].title} to queue`);
            guild_manager.song_queue.push(song_requests[i])
        }

        // ##### Start playback of the song queue #####
        // Connect to channel if its not connected
        if (guild_manager.connection === null){
            guild_manager.connectToChannel(message.member.voice.channel);
        }
        // Tell the player to start playback if its not active
        if (guild_manager.player.state.status === 'idle' || guild_manager.player.state.status === 'autopaused'){
            guild_manager.play_songs();
            // If more then one song is added also send the added to queue msg
            if (song_requests.length > 1){
                sendMessage(guild_manager.text_channel, `Added an additional ${song_requests.length} songs from playlist ${args[0]} to the queue`, -1)
            }
        }
        // Send the added to queue msg if the player is already active
        else {
            // Playlist was added
            if (song_requests.length > 1){
                sendMessage(guild_manager.text_channel, `Added ${song_requests.length} songs from playlist ${args[0]} to the queue`, -1)
            }
            // Single song was added
            else {
                sendMessage(guild_manager.text_channel, `Added \"${song_requests[0].title}\" : ${song_requests[0].url} - ${format_duration(song_requests[0].duration)} to queue`, -1)
            }
        }     
    }
};