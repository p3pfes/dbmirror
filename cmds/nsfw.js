const fs = require('fs')
const { name } = require('../../block')
const dat = require('../../funcs/dat').util()

module.exports = {
    name: "nsfw",
    description: "LOL",
    execute(message, args, client) {
        if (dat.checkdata(`./saves/${message.guild.id}/${message.mentions.channels.first().id}.json`)) {
            let data = dat.grabdata(message)
            console.log(data)

            if (data.nsfw) {
                data.nsfw = false
                message.channel.send("NSFW posts are unfiltered.")
            } else {
                data.nsfw = true
                message.channel.send("NSFW posts are now filtered.")
            }

            fs.writeFileSync(`./saves/${message.guild.id}/${message.mentions.channels.first().id}.json`, JSON.stringify(data, null, 2), 'utf8')
        } else {
            message.channel.send("Data does not exist for this server or channel.")
            return
        }
    }
}