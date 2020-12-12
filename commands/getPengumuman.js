const { prefix } = require("../config.json");
const axios = require("axios");
module.exports = {
  commands: "getPengumuman",
  minArgs: 1,
  expectedArgs: "<id>",
  callback: (message, arguments, text) => {
    const id = arguments[0];

    const gett = axios.create({
      baseURL: "http://127.0.0.1:8000/",
    });

    const getPengumumans = async () => {
      console.log(id);
      const pengumuman = await gett.get(`/api/pengumuman/uget/${id}`);

      console.log(pengumuman);

      const datas = pengumuman.data.data[0];

      // console.log(pengumuman);
      // setPengumumans(pengumuman.data.data);
      // setUsers(pengumuman.data.user);
      // console.log(users);
      // console.log(pengumumans);
      // const test = Object.assign({}, users, pengumumans);
      // setDatas(Object.assign({}, users, pengumumans));
      // console.log(datas);

      const { title, content, created_at } = datas;
      return message.channel.send(`${title}: ${content}`);
    };
    getPengumumans();
  },
};
