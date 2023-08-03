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

app.post("/api/memos", (req, res) => {
  //memos.push("추가 내용");
  //console.log(req.body);
  memos.push(req.body.content);
  res.send(memos);
});

app.put("/api/memos/:idx", (req, res) => {
  console.log(req.params.idx, req.body);
  memos[req.params.idx] = req.body.content;

  res.send(memos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
