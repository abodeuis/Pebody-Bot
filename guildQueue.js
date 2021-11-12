// guildQueue.js

module.exports = {
    
}

// should this be here or in the play function?
function createGuildQueue(message){
    const guild_queue = {
        voice_channel : message.voice_channel,
        text_channel : message.channel,
        connection : null,
        songs : []
    }
    __queue.set(message.guild.id, guild_queue)
}
        