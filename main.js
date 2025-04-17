const axios = require('axios')
const info = require('./info.json')
const { Client, GatewayIntentBits } = require('discord.js')
const fs = require("fs")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})
const prefix = "db!"

client.commands = {}
const commandFiles = fs.readdirSync("./cmds/").filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
  for (let name of require(`./cmds/${file}`).name) {
    client.commands[name] = file.substring(0, file.length - 3)
  }
}





client.on('messageCreate', message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/)

    const command = args.shift().toLowerCase()
    if (client.commands[command]) {
      
      var cmd = require(`./cmds/${client.commands[command]}.js`)
      cmd.execute(message,args,client)
    }
  } 
  return
})
client.login('')