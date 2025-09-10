const express = require("express");
const app = express();
const { generateOrgLeaderboard } = require("./functions/org_leaderboard");
const { updateOrgLeaderboardJob } = require("./jobs/update_leaderboard");

const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
generateOrgLeaderboard();
// updateOrgLeaderboardJob();
// generateCALeaderboard();
// updateCALeaderboardJob();
let default_json = {
  leaderboard: [],
  success: true,
  updatedAt: null,
  generated: false,
};
fs.writeFile(
  "org_leaderboard.json",
  JSON.stringify(default_json),
  "utf8",
  function (err) {
    if (err) throw err;
    console.log("org_leaderboard.json was reset");
  }
);
// fs.writeFile(
//   "caLeaderboard.json",
//   JSON.stringify(default_json),
//   "utf8",
//   function (err) {
//     if (err) throw err;
//     console.log("caLeaderboard.json was reset");
//   }
// );

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/Org_Leaderboard", (req, res) => {
  console.log("got the request");
  fs.readFile("org_leaderboard.json", "utf8", function (err, data) {
    if (err) throw err;
    console.log("sending response");
    let obj = JSON.parse(data);
    res.send(obj);
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});