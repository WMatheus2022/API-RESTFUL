const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://wander:WPWGlHFBRlTYqZIP@cluster0.zjhtjvh.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connection to database with sucess!!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
module.exports = main;
