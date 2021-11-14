// guildManager.js
// External Package Requirements
const ytdl = require('ytdl-core');
const {createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnectionStatus, entersState} = require('@discordjs/voice');
// Internal Files
const sendMessage = require('./send-message')
const { format_duration } = require('./utilities.js')

class guildManager {
    constructor(message){
        // Guild Information
        this.guild = message.guild;
        this.voice_channel = message.member.voice.channel;
        this.text_channel = message.channel;
        this.current_msg = null;    // Tracks the now playing msg
        this.connection = null;
        // Audio Information
        this.player = createAudioPlayer();
        this.current_audio = null;
        this.volume = 0.5;
        this.song_queue = [];
    }

    async connectToChannel(channel){
        // IDK if this is the right place to initialize this callback
        
        // Actual join init
        this.connection = joinVoiceChannel({
            channelId : channel.id,
            guildId : channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        })
        this.connection.on(VoiceConnectionStatus.Ready, () => {
            console.log(`${this.guild} connection is ready`)
        });
        this.connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                // Check for reconnection to a new channel
                await Promise.race([
                    entersState(this.connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(this.connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
            }
            catch (error) {
                // Seems to be a real disconnect
                this.connection.destroy();
            }
        })
        try {
            await entersState(this.connection, VoiceConnectionStatus.Ready, 30e3);  
        }
        catch {
            this.connection.destroy();
            sendMessage(this.text_channel,`Error Connecting to voice channel`, -1) 
            throw error;
        }

        // Setup the player to play to this connection
        this.connection.subscribe(this.player)
    }

    async play_songs(){
        // Remove the Last now playing msg
        this.clearNowPlayingMsg();

        // Song queue is done
        if (!this.song_queue[0]){
            this.connection.destroy();
            sendMessage(this.text_channel,`Done playing queue`)
            return;
        }

        const stream = ytdl(this.song_queue[0].url, {filter:'audioonly'});
        this.current_audio = createAudioResource(stream, {seek: this.song_queue[0].seek, volume: this.volume})
        this.setNowPlayingMsg();
        this.player.play(this.current_audio);
        //.on('finish', () => {
        //    this.song_queue.shift();
        //    this.play_songs();
        //});
        
    }

    setNowPlayingMsg(){
        // Just an Extra check to makes sure last msg is deleted
        this.clearNowPlayingMsg();
        this.text_channel.send(`Now playing \"${this.song_queue[0].title}\" : ${this.song_queue[0].url} - ${format_duration(this.song_queue[0].duration)}`).then(message => {
            this.current_msg = message; // Track Now Playing msg
        })
    }

    clearNowPlayingMsg(){
        // Remove the Last now playing msg
        if (this.current_msg){
            this.current_msg.delete();
            this.current_msg = null;
        }
    }

    destroy(){
        this.clearNowPlayingMsg();
        this.player.stop();
        this.connection.destroy();
    }
}

module.exports = guildManager;