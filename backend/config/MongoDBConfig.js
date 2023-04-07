const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
