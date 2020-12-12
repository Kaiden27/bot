const { prefix } = require("../config.json");
const axios = require("axios");
module.exports = {
  commands: "pengumuman",
  minArgs: 0,
  expectedArgs: "<id>",
  callback: (message, arguments, text) => {
    const id = arguments[0];

    const gett = axios.create({
      baseURL: "http://127.0.0.1:8000/",
    });

    const getPengumumans = async () => {
      const pengumuman = await gett.get("/api/pengumuman/uget");

      const a = pengumuman.data.data;
      const b = pengumuman.data.user;

      const result = a.map(function (el, x = 0) {
        var o = Object.assign({}, el);
        o.username = b[x];
        x++;
        console.log(x);
        return o;
      });
      const data = result;

      const c = [...a, ...b];
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(data);
      // console.log(pengumuman);
      // setPengumumans(pengumuman.data.data);
      // setUsers(pengumuman.data.user);
      // console.log(users);
      // console.log(pengumumans);
      // const test = Object.assign({}, users, pengumumans);
      // setDatas(Object.assign({}, users, pengumumans));
      // console.log(datas);
    };
    getPengumumans();
  },
};
