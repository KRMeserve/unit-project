// ------- REQUIRED CONSTANTS -------
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

// ------- CREATE ROUTE FOR SESSION -------
router.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, (error, foundUser) => {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.json(req.session.currentUser);
        } else {
            console.log("error");
        }
    });
});

router.get("/", (req, res) => {
    res.json(req.session);
});

router.get("/destroy", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
        } else {
            res.json("logged out");
        }
    });
});

module.exports = router;
