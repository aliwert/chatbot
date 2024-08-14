const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

const routes = require("./routes");
app.use(routes);

const errorHandler = require("../src/middlewares/errorHandler");
app.use(errorHandler);

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

const server = app.listen(PORT, function () {
  console.log(`Server running at http://localhost:5173/:${PORT}/`);
  exec(`open http://localhost:5173/:${PORT}/`);
});
