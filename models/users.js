const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    comments: [String],
    portfolioCustomizations: String,
    profilePic: String,
    followers: [String],
    projects: Number,
    circuitPoints: Number,
    gitHubProfileLink: String,
    name: String,
    proficiency: String,
    skills: [String],
    interests: [String],
    location: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
