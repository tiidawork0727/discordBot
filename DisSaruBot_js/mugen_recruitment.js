// const Discord = require('discord.js');
// const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// メッセージを送信する関数
function sendMessage() {
  const guild = client.guilds.cache.get('644877926290161704'); // サーバーIDを指定
  const channel = guild.channels.cache.get('644877926290161707'); // チャンネルIDを指定
  channel.send('ムゲン放置狩り 21:00~22:00 (1枠目)'); // メッセージを送信
  channel.send('ムゲン放置狩り 21:00~22:00 (2枠目)'); // メッセージを送信
}

// 毎日19時にメッセージを送信する関数
function scheduleDailyMessage(hour, minute) {
  const now = new Date();
  const target = new Date();
  // const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);
  target.setHours(hour, minute, 0)

  if (target.getTime() <= now.getTime()) {
    // 指定した時間がすでに過ぎている場合、翌日の同じ時間に送信する
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();
  setTimeout(() => {
    sendMessage();
    scheduleDailyMessage(); // 次回送信をスケジュールする
  }, delay);
}

// ログインする
client.login('');

// メッセージを送信時刻設定
scheduleDailyMessage(17, 20);