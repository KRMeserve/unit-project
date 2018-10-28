const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    comments: [String],
    portfolioCustomizations: String,
    profilePic: String,
    followers: [String],
    projects: {type: Number, default: 0},
    circuitPoints: {type: Number, default: 0},
    gitHubProfileLink: String,
    name: {type: String, default: 'Enter Your First Name'},
    fullName: {type: String, default: 'Enter your Full Name'},
    brandStatement: {type: String, default: 'Enter your Brand Statement'},
    proficiency: String,
    skills: [String],
    interests: [String],
    location: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
