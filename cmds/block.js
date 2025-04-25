const fs  = require('fs')
const util = require('../funcs/dat.js').util
module.exports = {
    name: ['block', 'delete', 'stop', 'remove'],
    description: "Broooooo",
    execute(message,args,client) {
        if(!message.mentions.channels.first()) {
            message.channel.send("Channel doesnt exist.")
            return
        }
        dataloc = `./saves/${message.guild.id}/${message.mentions.channels.first().id}.json`
        const dat = require('../funcs/dat.js').util().checkdata(dataloc)
        console.log(dat, dataloc)
        if(dat && message.channel.permissionsFor(message.member).has('ManageChannels')) {
            message.channel.send("Successfully removed.")
            fs.rmSync(dataloc)
            console.log('manual deletion occured') 
            return
        } else {
            message.channel.send("Invalid parameters/permissions.")
        }
    }
}
