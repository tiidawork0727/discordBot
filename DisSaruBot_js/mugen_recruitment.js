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
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;

    for (let i = 1; i < 3; i++) {
        // メッセージの送信
        client.channels.cache.get(channelId).send("@everyone\r\n" + formattedDate + " ムゲン放置狩り" + i + "枠目\r\n21:00~23:00")
            .then(() => console.log(`Sent message for ${formattedDate}`))
            .catch((error) => console.error(`Error sending message: ${error}`));
    }
}

// ボットのログイン
client.login(token);
