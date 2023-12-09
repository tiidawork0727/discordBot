const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// ボットのトークン
const token = '';

// 送信するチャンネルのID
var channelId = '';

// 毎日送信する時間（24時間表記の時刻）
const sendTime = '16:50:00';

// コマンドライン引数を取得
const args = process.argv.slice(2);

var endflg = 0;

// 引数があるかどうかを確認
if (args.length > 0) {
    console.log("渡された引数:", args);
    channelId = args.toString()
  } else {
    console.log("引数がありません。");
  }

// ボットがログインした時に実行される処理
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // メッセージ送信
    sendDailyMessage();

    // 1分後に終了するように設定
    setTimeout(() => {
        console.log('Program will exit after 1 minute.');
        process.exit();
    }, 30 * 1000);
});

// メッセージを送信する処理
function sendDailyMessage() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;

    // 重複したメッセージをまとめる
    const messageWork = "@everyone\r\n" + formattedDate + "\r\nムゲン放置狩り";
    // 繰り返しになりそうなメッセージを配列にする（0から始まる）
    const messageList = ["枠目\r\n21:00~23:00", "枠目\r\n22:00~23:00"];

        // 送信するメッセージの管理（時間帯を管理）
    for (let i = 0; i < 2; i++) {
        // 枠数の管理
        for (let j = 1; j < 5; j++) {
            // メッセージの送信
            sendMessage(messageWork,messageList[i],j);
        }
    }
}

// メッセージ送信
function sendMessage(messageWork, messageList, j) {
    client.channels.cache.get(channelId).send(messageWork + j + messageList)
    .then(() => console.log(`Sent message for\r\n${messageWork + j + messageList}`))
    .catch((error) => console.error(`Error sending message: ${error}`));
}

// ボットのログイン
client.login(token);
