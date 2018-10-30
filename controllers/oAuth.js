const express = require("express");
const request = require("request");
const router = express.Router();

//===========================================
// IMPORT MODELS
//===========================================
const User = require("../models/users.js");

//===========================================
// AUTHORIZE URL, TOKEN URL, API URL, REDIRECT URL
//===========================================
const authorize_url = "https://github.com/login/oauth/authorize";
const token_url = "https://github.com/login/oauth/access_token";
const api_url = "https://api.github.com/user";
const redirect_uri = process.env.REDIRECT_URI;
const encoded_redirect_uri = encodeURIComponent(redirect_uri);

//===========================================
// CLIENT ID AND CLIENT SECRET
//===========================================
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

let access_token = null;

//===========================================
// GET AND DISPLAY DAYA
//===========================================
const getAndDisplayData = res => {
    res.json("access token was found");
};

//===========================================
// RECEIVE DATA FROM GET REQUEST
//===========================================
router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    User.findById(id, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundUser);
            if (foundUser.githubUserToken !== null) {
                console.log(`user token`);
                access_token = foundUser.githubUserToken;
                getAndDisplayData(res);
            } else {
                console.log(`user token is not found`);
                console.log(
                    `${authorize_url}?scope=user%3Aemail&client_id=${client_id}&redirect_uri=${encoded_redirect_uri}`
                );
                res.redirect(
                    `${authorize_url}?scope=user%3Aemail&client_id=${client_id}&redirect_uri=${encoded_redirect_uri}`
                );
            }
        }
    });
});

module.exports = router;
