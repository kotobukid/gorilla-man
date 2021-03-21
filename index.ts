import Discord from 'discord.js';

const client: Discord.Client = new Discord.Client();
import process from 'process';
import fs from 'fs';

let token: string = '';

if (fs.existsSync('./config/secret.js')) {
    token = require('./config/secret');
    if (!token) {
        console.error('secret.js empty.');
        process.exit(1);
    }
} else {
    console.error('./config/secret.js not found.');
    process.exit(1);
}

client.on('ready', () => {
    console.log(`${client.user!.tag} でログイン`);
});

client.on('message', async msg => {
    if (msg.author.bot) {
        return;
    } else if (msg.content === '!ping') {
        msg.channel.send('Pong!').then();
    } else if (msg.content === '!logout') {
        msg.channel.send("I'l be back").then();
        console.log("I'll be back");

        setTimeout(() => {
            client.destroy();
            process.exit();
        }, 2500);
    }
});

client.login(token).then();