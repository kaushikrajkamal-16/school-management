const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dbConnection = require("../backend/Configuration/dbConfig");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
dbConnection();
const PORT = process.env.PORT;
const routes = require("./routes");

app.get("/", function (req, res) {
  res.send("Auth API");
  console.log("Cookies: ", req.cookies);
});
app.use(routes);

app.listen(PORT, (req, res) => {
  {
    console.log("Hello from the server");
  }
});
