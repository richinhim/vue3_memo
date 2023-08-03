const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const app = express();
const port = 3000;

const memos = [];
// const memos = ["메모1 내용", "메모2 내용", "메모3 내용"];
app.use(bodyParser.json());

app.get("/api/memos", async (req, res) => {
  const result = await database.run("select * from memo");
  res.send(result);
  //res.send(memos);
});

app.post("/api/memos", async (req, res) => {
  //memos.push("추가 내용");
  //console.log(req.body);
  await database.run(
    `insert into memo (content) values('${req.body.content}')`
  );
  const result = await database.run("select * from memo");
  //memos.push(req.body.content);
  res.send(result);
});

app.put("/api/memos/:id", async (req, res) => {
  await database.run(
    `update memo set content='${req.body.content}' where id=${req.params.id}`
  );
  const result = await database.run("select * from memo");
  //memos.push(req.body.content);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
