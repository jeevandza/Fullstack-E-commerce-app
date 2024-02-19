const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI, {});
    if (connectDB) {
      console.log("Database connected");
    }
  } catch (err) {
    console.log(`Database error ${err}`);
  }
}

module.exports = { connectDatabase };
