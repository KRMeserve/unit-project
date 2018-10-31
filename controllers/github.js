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

const redirect_home = process.env.REDIRECT_HOME;

//===========================================
// CLIENT ID AND CLIENT SECRET
//===========================================
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

let access_token = null;

//===========================================
// GET AND DISPLAY DAYA
//===========================================
const getAndDisplayData = (res, req) => {
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
            // const image = body.avatar_url;
            // console.log(body.avatar_url);
            // res.json(JSON.parse(body));
            req.session.github = JSON.parse(body);
            res.redirect("/");
        }
    );
};

//===========================================
// AFTER 1st TIME AUTHORIZATION, GITHUB
// REDIRECTS TO THIS URL
//===========================================
router.get("/callback", (req, res) => {
    console.log(`entering callback route`);
    const auth_code = req.query.code;
    console.log(auth_code);
    console.log({
        client_id: client_id,
        client_secret: client_secret,
        code: auth_code,
        redirect_uri: redirect_uri
    });
    request(
        {
            uri: token_url,
            method: "POST",
            form: {
                client_id: client_id,
                client_secret: client_secret,
                code: auth_code,
                redirect_uri: redirect_uri
            }
        },
        function(err, response, body) {
            //===========================================
            // RETRIEVE ACCESS TOKEN FROM BODY
            //===========================================
            access_token = body.split("&")[0].split("=")[1];
            console.log(access_token);
            //===========================================
            // LATER: NEED TO SAVE ACCESS TOKEN IN DB FOR EACH USER
            //===========================================
            getAndDisplayData(res, req);
        }
    );
});

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
                getAndDisplayData(res, req);
            } else {
                console.log(`user token is not found`);
                res.json("User Token Not Found");
            }
        }
    });
});

module.exports = router;
