const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log('got to map router');
    request({
        uri: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDxI7hQ6FV7eJebME3a_nqIZ2vh7Shv0TQ&callback=initMap',
        method: 'GET'
    }, function(error, response, body){
        res.redirect('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxI7hQ6FV7eJebME3a_nqIZ2vh7Shv0TQ&callback=initMap');
    });
});

module.exports = router;
