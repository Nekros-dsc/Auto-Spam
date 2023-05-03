// By https://github.com/Nekros-dsc
const { Client } = require('discord.js-selfbot-v13');
const config = require('./config');
const prefix = config.client.prefix;

const client = new Client({
  checkUpdate: false,
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

commandIntervals = [];

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'spam') {
    if (message.deletable) message.delete().catch(() => false);
    if (message.channel.type === "dm") return;
    let spam = args.slice(0).join(" ");
    if (spam.length === 0) {
        message.channel.send("Please specify the message you want to spam.");
        return;
    }
    let interval = setInterval(function() {
        message.channel.send(spam);
    }, 1000);
    commandIntervals.push(interval);
  } else if (command === 'stopspam') {
    commandIntervals.forEach(interval => {
        clearInterval(interval);
    });
    message.edit("Spam command stopped successfully.").then(msg => {
        setTimeout(() => {
            msg.delete();
        }, 10000);
    });
  }
});

client.login(config.client.token);
