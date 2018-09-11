let express = require('express');
let router = express.Router();
let request = require('request');
let Settings = require('../settings');
let Site = require('../site');

router.get('/', (req, res, next) => {
    let sites = ['fresno1', 'fresno2', 'field1', 'field2'];
    let data = {};
    let viewObj = { title: 'Index', data: data };

    for ( var i=0; i<sites.length; i++ ) {
        const s = new Site(sites[i]);
        data.push(s.execute());
    }

    viewObj.datastr = JSON.stringify(data);
    res.render('index',viewObj);
});


/* GET home page. */
router.get('/sites', function(req, res, next) {
    let settings = new Settings();
    let url = settings.sensorURL + 'site/';
    let formData = {
        id: 'fresno1'
    };

    let viewobj = { title: 'Index', url: url };

    request
        .post( url, {form: formData}, (err, httpResponse, body) => {
            let status =  JSON.parse(body).status  ;
            if ( status === "error" ) {
                console.log('status = error');
                viewobj.error = httpResponse.statusMessage ;
                viewobj.title = 'Error';
                res.render('error',viewobj);
            } else {
                console.log('post return');
                viewobj.data = httpResponse.body;
                viewobj.datastr = JSON.stringify(httpResponse.body);
                res.render('index',viewobj);
            }
        })
        .on('error', (err) => {
            console.log('error');
            viewobj.error = err;
            res.render('error',viewobj);
        });
});

module.exports = router;
