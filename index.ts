import Discord, {Channel, Message, TextChannel} from 'discord.js';
import process from 'process';
import fs from 'fs';

import Redis, {Redis as R} from "ioredis";

const client: Discord.Client = new Discord.Client();

const redis: R = new Redis();

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

let notice_channel: string = '';

client.on('ready', () => {

    for (const [key, value] of client.channels.cache) {
        if ((value as TextChannel).name === '一般' && value.type === 'text') {
            notice_channel = key;
            break;
        }
    }

    console.log(`${client.user!.tag} でログイン`);
});

client.on('message', async (msg: Message) => {
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

redis.subscribe('inspect').then(() => {
    redis.on('message', (channel: string, message: string) => {
        if (channel === 'inspect') {
            const channel: Channel | undefined = client.channels.cache.get(notice_channel);
            if (channel) {
                (channel as TextChannel).send(message).then();
            } else {
                console.error(`target channel not found: ${notice_channel}`);
            }
        }
    });
})

client.login(token).then(() => {
});