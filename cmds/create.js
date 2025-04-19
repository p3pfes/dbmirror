const fs = require('fs')
module.exports = {
    name:["post"],
    description:"Hi lol",
    execute(message,args,client) {
        let dat = require('../funcs/dat.js').util().grabdata(message)
        if (args[0])
        if(message.channel.permissionsFor(message.member).has('ManageChannels')) {
            ochannel = message.mentions.channels.first() 
            if(ochannel || `<#${ochannel.id}>` == args[0]) {
                let tag = args[1]
                if(!tag) {
                    message.channel.send("Please specify a tag.")
                    return
                }
                if (!args[0]) {
                    message.channel.send("Please specify a channel.")
                    return
                }
                let diddyAhhBluds = ["loli", "lolicon", "shota", "shotacon"]
                if (tag && diddyAhhBluds.includes(tag.toLowerCase)) {
                    message.channel.send("This tag has been blacklisted.")
                    return
                }
                /*
                
                */
                //get the server id, aswell as intented channel id and store it in a file named the server id. should be a json inside it called "${channelid}.json"
                var saveloc = './saves'
                if (!fs.existsSync(saveloc)) {
                    fs.mkdirSync(saveloc)
                } 
                saveloc = saveloc + '/'
                const area = saveloc + message.guild.id
                if (!fs.existsSync(area)) {
                    fs.mkdirSync(area)
                }
                
                if(fs.existsSync(area+`/${ochannel.id}.json`)) {
                    message.channel.send(`Replaced tag ${dat.tag} with ${tag}.`)
                    dat.tag = tag 
                    fs.writeFileSync(`${area}/${ochannel.id}.json`, JSON.stringify(dat, null, 2), 'utf8')
                    return
                } else {
                    fs.appendFile(area + `/${ochannel.id}.json`, `{"nsfw": true, "tag":"${tag}"}`,"utf8", function (err) {
                        if (err) throw err
                    }) 
                    message.channel.send(`Successfully added. Will now post ${tag} in <#${ochannel.id}>`)
                    return
                }
            }
        } else {
            message.channel.send("Invalid permissions!")
            return
        }
    }
}
