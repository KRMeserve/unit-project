const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// SERVER ROUTES WILL GO HERE
router.get('/', (req, res)=>{
    User.find({}, (error, allUsers)=>{
        res.json(allUsers);
    });
});

router.post('/', (req, res)=>{
    User.create(req.body, (error, createdUser)=>{
        res.json(createdUser);
    });
});

router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id, (error, deletedUser)=>{
        res.json(deletedUser);
    });
});

router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedUser)=>{
        res.json(updatedUser);
    });
});

module.exports = router;
