const express = require('express');
const router = express.Router();

// SERVER ROUTES WILL GO HERE
router.get('/', (req, res)=>{
    res.json('INFORMATION');
});

module.exports = router;
