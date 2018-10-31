const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    comments: [String],
    portfolioCustomizations: String,
    profilePic: String,
    followers: { type: Number, default: 0 },
    projects: { type: Number, default: 0 },
    circuitPoints: { type: Number, default: 0 },
    github: String,
    githubUserToken: { type: String, default: null },
    name: String,
    brandStatement: String,
    proficiency: String,
    skills: [String],
    interests: [String],
    latitude: Number,
    longitude: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
