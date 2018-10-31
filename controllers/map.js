const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log('got to map router');
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    res.render('map.ejs', {
        latitude: latitude,
        longitude: longitude,
        apiKey: process.env.MAP_API_KEY
    });
    // request({
    //     uri: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDxI7hQ6FV7eJebME3a_nqIZ2vh7Shv0TQ&callback=initMap',
    //     method: 'GET'
    // }, function(error, response, body){
    //     res.redirect('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxI7hQ6FV7eJebME3a_nqIZ2vh7Shv0TQ&callback=initMap');
    // });
});

module.exports = router;
