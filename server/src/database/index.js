const mongoose = require("mongoose");


/**
 * Database connection to mongodb to using uri
 */
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
