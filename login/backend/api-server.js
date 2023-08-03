const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
const members = [
  {
    id: 3,
    name: "도서관",
    loginId: "lib",
    loginPw: "africa",
  },
  {
    id: 4,
    name: "홍길동",
    loginId: "a",
    loginPw: "1",
  },
];

app.get("/api/account", (req, res) => {
  console.log("req.cookies", req.cookies);

  if (req.cookies && req.cookies.account) {
    const member = JSON.parse(req.cookies.account);
    if (member.id) {
      return res.send(member);
    }
  }
  res.send(null);
  //res.send(401);
  /*  res.send({
    mid: 3,
    memberName: "홍길동",
  }); */
});

app.post("/api/account", (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;
  console.log(loginId, loginPw);

  const member = members.find(
    (m) => m.loginId === loginId && m.loginPw === loginPw
  );

  console.log(member);
  if (member) {
    const options = {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    };
    res.cookie("account", JSON.stringify(member), options);
    res.send(member);
  } else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
