const mongoose = require("mongoose");
require("dotenv").config();

async function DBconnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
}

module.exports = { DBconnection };
