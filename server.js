require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const PORT = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://localhost/" + "circuit";

// Middleware
app.use(express.json());
app.use(express.static("public"));
// Session Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

const userController = require("./controllers/users.js");
app.use("/users", userController);

app.listen(PORT, () => {
  console.log("listening...");
});

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
