let express = require('express');
let router = express.Router();
let request = require('request');
let Settings = require('../settings');


/* GET home page. */
router.get('/', function(req, res, next) {
    let settings = new Settings();
    let url = settings.sensorURL;
    let viewobj = { title: 'Index', url: url };

    request.get(url, ( error, response, body ) => {
       if ( error ) {
           res.render('index', )
       }

    });

    res.render('index', viewobj);



});



module.exports = router;
