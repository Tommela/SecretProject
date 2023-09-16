//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

var correctPwd = "ILoveProgramming";
var userIsAuthorised = false;

const Checkpassword = (req, res, next) => {
  const password = req.body["password"];
  if (password === correctPwd) {
    userIsAuthorised = true;
  }
  next();
};

app.use(Checkpassword);

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised && correctPwd == req.body["password"]) {
    res.sendFile(_dirname + "/public/secret.html");
  } else {
    res.sendFile(_dirname + "/public/index.html");
    // res.redirect("/")
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
