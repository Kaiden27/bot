const { prefix } = require("../config.json");
module.exports = {
  commands: "sync",
  minArgs: 1,
  expectedArgs: "<user_id>",
  callback: (message, arguments, text) => {
    const user_id = arguments[0];
    if (!user_id) {
      message.reply("Please Enter sync_id");
      return;
    } else {
      if (message.member.roles.cache.find((r) => r.name === "Student")) {
        message.channel.send("You Are A Student");
      } else if (message.member.roles.cache.find((r) => r.name === "Teacher")) {
        message.channel.send("You Are A Teacher");
      } else {
        message.channel.send("You Are NOT A Student Or A Teacher");
      }
    }
  },
};
