const { prefix } = require("../config.json");
const axios = require("axios");
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
        const role = "Murid";
        const roled = { role: role };
        const run = () => {
          axios
            .put(`http://127.0.0.1:8000/api/auth/sync/${user_id}`, roled)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                message.channel.send(
                  `Account ${res.data.username} Synced Successfully`
                );
              } else {
                message.channel.send(`Account ${user_id} Does Not Exist`);
              }
            })
            .catch((err) => {
              message.channel.send(`User ${user_id} Does Not Exist`);
            });
        };
        run();
      } else if (message.member.roles.cache.find((r) => r.name === "Teacher")) {
        const role = "guru";
        const roled = { role: role };
        const run = () => {
          axios
            .put(`http://127.0.0.1:8000/api/auth/sync/${user_id}`, roled)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                message.channel.send(
                  `Account ${res.data.username} Synced Successfully`
                );
              } else {
                message.channel.send(`Account ${user_id} Does Not Exist`);
              }
            })
            .catch((err) => {
              message.channel.send(`User ${user_id} Does Not Exist`);
            });
        };
        run();
      } else {
        message.channel.send("You Are NOT A Student Or A Teacher");
      }
    }
  },
};
