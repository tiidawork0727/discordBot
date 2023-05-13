const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// ボットのトークン
const token = '';

// 送信するチャンネルのID
const channelId = '';

// 毎日送信する時間（24時間表記の時刻）
const sendTime = '16:50:00';

// ボットがログインした時に実行される処理
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // 指定した時刻にメッセージを送信するための処理
    const now = new Date();
    const timeToSend = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        sendTime.split(':')[0],
        sendTime.split(':')[1],
        sendTime.split(':')[2]
    );

    const timeUntilSend = timeToSend.getTime() - now.getTime();
    if (timeUntilSend < 0) {
        timeToSend.setDate(timeToSend.getDate() + 1);
    }

    setTimeout(() => {
        sendDailyMessage();
        setInterval(sendDailyMessage, 24 * 60 * 60 * 1000);
    }, timeUntilSend);
});

// メッセージを送信する処理
function sendDailyMessage() {
    const now = new Date();
    const dateString = now.getFullYear() + ('00' + (now.getMonth() + 1)).slice(-2) + ('00' + now.getDate()).slice(-2);

    // メッセージの送信
    client.channels.cache.get(channelId).send(dateString + " ムゲン放置狩り\r\n9:00~11:00")
        .then(() => console.log(`Sent message for ${dateString + "9:00~11:00"}`))
        .catch((error) => console.error(`Error sending message: ${error}`));
    
    client.channels.cache.get(channelId).send(dateString + " ムゲン放置狩り\r\n13:30~15:30")
        .then(() => console.log(`Sent message for ${dateString + "13:30~15:30"}`))
        .catch((error) => console.error(`Error sending message: ${error}`));
    
    client.channels.cache.get(channelId).send(dateString + " ムゲン放置狩り\r\n16:00~18:00")
        .then(() => console.log(`Sent message for ${dateString + "16:00~18:00"}`))
        .catch((error) => console.error(`Error sending message: ${error}`));

    client.channels.cache.get(channelId).send(dateString + " ムゲン放置狩り\r\n22:00~24:00")
        .then(() => console.log(`Sent message for ${dateString + "22:00~24:00"}`))
        .catch((error) => console.error(`Error sending message: ${error}`));
    }

// ボットのログイン
client.login(token);
