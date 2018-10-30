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
    console.log(
        "access token was found and we're inside get and display data fn"
    );
    request(
        {
            uri: `${api_url}?access_token=${access_token}`,
            method: "GET",
            headers: {
                "User-Agent": "CircuitConnection"
            }
        },
        function(err, response, body) {
            res.json(body);
        }
    );
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
                console.log(`user token was already there`);
                access_token = foundUser.githubUserToken;
                getAndDisplayData(res);
            } else {
                console.log(`user token is not found`);
                console.log(
                    `${authorize_url}?scope=user%3Aemail&client_id=${client_id}&redirect_uri=${encoded_redirect_uri}`
                );
                res.json("User Token Not Found");
            }
        }
    });
});

//===========================================
// AFTER 1st TIME AUTHORIZATION, GITHUB
// REDIRECTS TO THIS URL
//===========================================
router.get("/callback", (req, res) => {
    console.log(`entering callback route`);
    const auth_code = req.query.code;
    res.send('hello');
    // request(
    //     {
    //         uri: token_url,
    //         method: "POST",
    //         form: {
    //             client_id: client_id,
    //             client_secret: client_secret,
    //             code: auth_code,
    //             redirect_uri: redirect_uri
    //         }
    //     },
    //     function(err, response, body) {
    //         //===========================================
    //         // RETRIEVE ACCESS TOKEN FROM BODY
    //         //===========================================
    //         access_token = body.split("&")[0].split("=")[1];
    //         //===========================================
    //         // LATER: NEED TO SAVE ACCESS TOKEN IN DB FOR EACH USER
    //         //===========================================
    //         getAndDisplayData(res);
    //     }
    // );
});

module.exports = router;
