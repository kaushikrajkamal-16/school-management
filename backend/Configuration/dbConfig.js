const mongoose = require("mongoose");

const db = function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log(`Database is not connected ${error}`);
    });
};

module.exports = db;
