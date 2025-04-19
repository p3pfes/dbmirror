

const https = require('https')
const savesDir = './saves'
const { Client, GatewayIntentBits } = require('discord.js')
const fs = require("fs")
const diddyAhhTags = ["loli",'shota', 'lolicon', 'shotacon']
let seenPostIds = new Set()
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})
console.log(client.guilds.cache.size, 'servers')
const prefix = "db!"
function serverTags() {
  const watchers = [];

  const serverFolders = fs.readdirSync(savesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  serverFolders.forEach(serverId => {
    const serverPath = `${savesDir}/${serverId}`;
    const files = fs.readdirSync(serverPath).filter(file => file.endsWith('.json'));

    files.forEach(file => {
      const filePath = `${serverPath}/${file}`;
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(raw);
        const tag = json.tag?.toLowerCase();
        const nsfw = json.nsfw
        const channelId = file.replace('.json', '');

        if (tag && channelId) {
          watchers.push({ serverId, channelId, tag , nsfw});
        }
      } catch (err) {
        console.error(`error reading ${filePath}:`, err.message);
      }
    });
  });
  console.log(watchers)
  return watchers;
}
function fetchLatestPosts(callback) {
  const options = {
    hostname: 'danbooru.donmai.us',
    path: '/posts.json?limit=10&only=id,tag_string,file_url',
    method: 'GET',
    headers: {
      'User-Agent': 'DanbooruDiscordBot/1.0'
    }
  };

  https.get(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const posts = JSON.parse(data);
        callback(null, posts);
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', err => callback(err));
}
function danbooruListener() {
  const watchers = serverTags();

  if (watchers.length === 0) {
    console.log('no tags to watch for.');
    return;
  }

  fetchLatestPosts((err, posts) => {
    if (err) {
      console.error('failed to fetch posts', err.message);
      return;
    }

    posts.forEach(post => {
      if (seenPostIds.has(post.id)) return;

      const postTags = post.tag_string.toLowerCase().split(' ');
      if (diddyAhhTags.some(diddyMoment => postTags.includes(diddyMoment))) {
        console.log(`${postTags} has been blocked`)
        return
      }
      watchers.forEach(({ channelId, tag }) => {
        if (postTags.includes(tag)) {
          const channel = client.channels.cache.get(channelId);
          if (channel) {
            const postUrl = `https://danbooru.donmai.us/posts/${post.id}`;
            const imageUrl = post.file_url || postUrl;

            channel.send(`**Tag:** \`${tag}\`\n ${postUrl}\n ${imageUrl}`)
            .catch(err => console.error(`couldn't send to channel ${channelId}:`, err.message));
          }
        }
      });

      seenPostIds.add(post.id);
    });
  });
}

client.commands = {}
const commandFiles = fs.readdirSync("./cmds/").filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
  for (let name of require(`./cmds/${file}`).name) {
    client.commands[name] = file.substring(0, file.length - 3)
  }
}

client.once('ready', () => {
  console.log(`Logged on as ${client.user.tag}`)
  danbooruListener()
  setInterval(danbooruListener, 30000)
})
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
//setup an nsfw toggle using nsfw.js file
