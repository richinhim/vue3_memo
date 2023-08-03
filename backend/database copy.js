const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  connectionLimit: 5,
  database: "board",
});

module.exports = {
  async run(query) {
    return new Promise((resolve) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .query(query)
            .then((rows) => {
              resolve(rows);
              console.log(rows);
            })
            .then((res) => {
              console.log(res);
              conn.end();
            })
            .catch((err) => {
              //handle error
              console.log(err);
              conn.end();
            });
        })
        .catch((err) => {
          //not connected
        });
    });
  },
};
