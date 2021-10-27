// send-message.js

module.exports = (channel, text, duration = 60) => {
    channel.send(text).then(message => {
        if (duration === -1) {
            return
        }

        setTimeout(() => {
            message.delete()
        }, 1000 * duration)
    })
}