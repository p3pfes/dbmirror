const fs = require('fs') 
exports.util = function()  {
    const ret = {
        "checkdata": function(area) {
            if (!fs.existsSync(area)) {
                return false
            } else {
                return true
            }

        },
        "grabdata": function(message) {
            if(fs.existsSync(`./saves/${message.guild.id}/${message.mentions.channels.first().id}.json`)) {
                //I SPENT 30 FUCKIGN MINUTES DEBUGGING THIS AND I ONLY REALISED THAT I MISSPELT "SAVES" AS "SAVE"
                const data = JSON.parse(fs.readFileSync(`./saves/${message.guild.id}/${message.mentions.channels.first().id}.json`), 'utf8')
                return data
            }
            if (fs.existSync(`./saves/${message.guild.id}/${message.id}.json`){
                const data = JSON.parse(fs.readFileSync(`./saves/${message.guild.id}/${message.id}.json`), 'utf8')
                return data
            }
        }
    }
    return ret
}
