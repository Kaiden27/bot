require("dotenv").config();
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

const { Client, Message, Collection } = require("discord.js");
const client = new Client();
const axios = require("axios");

client.on("ready", () => {
  console.log(`${client.user.tag} Logged In`);

  const baseFile = "command-base.js";
  const commandBase = require(`./commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commandBase(client, option);
        console.log(file, option);
      }
    }
  };

  readCommands("commands");
});

client.login(process.env.BOT_TOKEN);

// command(client, ["saha", "sahamaneh", "sia"], (message) => {
//   message.channel.send("GOD");
// });

// client.on("message", (message) => {
//   if (message.author.bot) return;
//   if (message.member.roles.cache.find((r) => r.name === "Student")) {
//     message.channel.send("You Are A Student");
//   } else {
//     message.channel.send("You Are NOT A Student");
//   }
// });

// client.on("message", (message) => {
//   if (message.author.bot) return;
//   console.log(`${message.author.tag} : ${message.content}`);
//   message.channel.send(`${message.content}`);
// });
