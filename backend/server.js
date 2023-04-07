const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/MongoDBConfig");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// Connect to the database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to InstaGram Clone App API created By senthiltechspot",
  });
});

require("./routes/Auth.routes")(app);
require("./routes/User.routes")(app);
require("./routes/Post.routes")(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
