const fs = require('fs')
module.exports = {
    name:["post"],
    description:"Hi lol",
    execute(message,args,client) {
        if (args[0])
        if(message.channel.permissionsFor(message.member).has('ManageChannels')) {
            ochannel = message.mentions.channels.first() 
            if(ochannel || `<#${ochannel.id}>` == args[0]) {
                //get the server id, aswell as intented channel id and store it in a file named the server id. should be a json inside it called "${channelid}.json"
                message.channel.send("Saved!") 
            }
        } else {
            message.channel.send("Invalid permissions!")
            return
        }
    }
}