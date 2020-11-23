require("dotenv").config();

const { Client, Message } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log(`${client.user.tag} Logged In`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  console.log(`${message.author.tag} : ${message.content}`);
  message.channel.send(`${message.content}`);
});

client.login(process.env.BOT_TOKEN);
