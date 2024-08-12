const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const routes = require("./routes");
app.use(routes);

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, function () {
  console.log(`Running: http://127.0.0.1:${PORT}/`);
  exec(`open http://127.0.0.1:${PORT}/`);
});
