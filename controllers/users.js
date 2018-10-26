// -------- REQUIRED CONSTANTS --------
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// -------- GET ROUTE FOR USERS --------
router.get('/', (req, res)=>{
    User.find({}, (error, allUsers)=>{
        res.json(allUsers);
    });
});

// -------- CREATE ROUTE FOR USERS --------
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser)=>{
        res.json(createdUser);
    });
});

// -------- DELETE ROUTE FOR USERS --------
router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id, (error, deletedUser)=>{
        res.json(deletedUser);
    });
});

// -------- UPDATE ROUTE FOR USERS --------
router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedUser)=>{
        res.json(updatedUser);
    });
});

// -------- EXPORT USERS --------
module.exports = router;
