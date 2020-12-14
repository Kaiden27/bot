const { prefix } = require("../config.json");
const axios = require("axios");
var dayjs = require("dayjs");
const Discord = require("discord.js");

module.exports = {
  commands: "jadwal",
  minArgs: 0,
  expectedArgs: "<id>",
  callback: (message, arguments, text) => {
    const id = arguments[0];

    const gett = axios.create({
      baseURL: "http://127.0.0.1:8000/",
    });

    const getJadwal = async () => {
      console.log(id);
      var datas = await gett.get(`/api/jadwal/get`);
      datas = datas.data.data;

      console.log(datas);

      //   const a = jadwals.data.data;
      //   const b = jadwals.data.user;
      //   const c = jadwals.data.avatar;

      //   const result = a.map(function (el, x = 0) {
      //     var o = Object.assign({}, el);
      //     o.username = b[x];
      //     x++;
      //     console.log(x);
      //     return o;
      //   });
      //   const result2 = result.map(function (el, x = 0) {
      //     var o = Object.assign({}, el);
      //     o.avatar_url = c[x];
      //     x++;
      //     console.log(x);
      //     return o;
      //   });
      //   console.log(result2);   <<<<ieu <<<

      // udah anu di console tadi teh  eta data akhir na

      const weekOfYear = require("dayjs/plugin/weekOfYear");

      dayjs.extend(weekOfYear);
      const currentWeek = dayjs(Date.now()).week();

      //   const datas = result2;
      //   const datas = pengumuman.data.data[0];

      // console.log(pengumuman);
      // setPengumumans(pengumuman.wdata.data);
      // setUsers(pengumuman.data.user);
      // console.log(users);
      // console.log(pengumumans);
      // const test = Object.assign({}, users, pengumumans);
      // setDatas(Object.assign({}, users, pengumumans));
      // console.log(datas);

      //   const { title, content, created_at } = datas;
      // Senin sampai jubmat
      let result = [];
      for (var i = 0; i < 5; i++) {
        let j = datas
          .filter(
            (data) =>
              dayjs(data.tanggal).day() === i + 1 &&
              currentWeek === dayjs(data.tanggal).week()
          )
          .map((data) => [
            {
              name: data.title,
              value: `Guru: ${data.user.username} 
                Jam: ${data.jam}`,
            },
            { name: "\u200B", value: "\u200B" },
          ]);

        result.push(j);
      }

      let hari = ["senin", "selasa", "rabu", "kamis", "jumat"];

      for (var i = 0; i < 5; i++) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Jadwal " + hari[i])
          .setAuthor(
            "Discord Class Assitant",
            "https://cdn.discordapp.com/attachments/456779106944679947/788065861159223346/unknown.png"
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/456779106944679947/788065861159223346/unknown.png"
          )
          .setTimestamp();

        for (let j in result[i]) {
          exampleEmbed.addFields(result[i][j]);
        }

        message.channel.send(exampleEmbed);
      }

      //   {
      //     datas.map((data) => {
      //       const {
      //         title,
      //         description,
      //         type,
      //         attachment,
      //         user,
      //         id,
      //         tanggal,
      //         jam,
      //         discord,
      //       } = data;

      //       const { username } = user;
      //       //   const { avatar_url } = discord;

      //       if (dayjs(tanggal).day() === 1) {
      //         if (currentWeek === dayjs(tanggal).week()) {
      //           const exampleEmbed = new Discord.MessageEmbed()
      //             .setColor("#0099ff")
      //             .setTitle("Jadwal Senin")
      //             .setAuthor(
      //               "Discord Class Assitant",
      //               "https://cdn.discordapp.com/attachments/456779106944679947/788065861159223346/unknown.png"
      //             )
      //             .setThumbnail(
      //               "https://cdn.discordapp.com/attachments/456779106944679947/788065861159223346/unknown.png"
      //             )
      //             .addFields(
      //               {
      //                 name: title,
      //                 value: `Guru: ${username}
      //               Jam: ${jam}`,
      //               },
      //               { name: "\u200B", value: "\u200B" }
      //             )
      //             .setTimestamp();

      //           return message.channel.send(exampleEmbed);
      //         }
      //       }
      //     });
      //   }
      //   message.channel.send("Selasa");
      //   {
      //     datas.map((data) => {
      //       const {
      //         title,
      //         description,
      //         type,
      //         attachment,
      //         username,
      //         id,
      //         tanggal,
      //         jam,
      //         avatar_url,
      //       } = data;

      //       if (dayjs(tanggal).day() === 2) {
      //         if (currentWeek === dayjs(tanggal).week()) {
      //           return message.channel.send(
      //             `Pelajaran:${title} Guru:${username} Jam:${jam}`
      //           );
      //         }
      //       }
      //     });
      //   }
      //   message.channel.send("Rabu");
      //   {
      //     datas.map((data) => {
      //       const {
      //         title,
      //         description,
      //         type,
      //         attachment,
      //         username,
      //         id,
      //         tanggal,
      //         jam,
      //         avatar_url,
      //       } = data;

      //       if (dayjs(tanggal).day() === 3) {
      //         if (currentWeek === dayjs(tanggal).week()) {
      //           return message.channel.send(
      //             `Pelajaran: ${title} Guru:${username} Jam:${jam}`
      //           );
      //         }
      //       }
      //     });
      //   }
      //   //   return message.channel.send(exampleEmbed);
    };
    getJadwal();
  },
};
