'use strict';

let request = require('request');
let Settings = require('../settings');

class Site {

    constructor(siteId) {
        this.settings = new Settings();
        this.id = siteId;
        this.url = this.settings.sensorURL + 'site/';
        this.formData = {
            id: this.id
        };
        this.result = {};
    }

    async execute() {
        this.result = {};
        let viewObj = {};
        request
            .post( this.url, {form: this.formData}, (err, httpResponse, bodyStr) => {
                let body = JSON.parse(bodyStr);
                let status = "";
                if ( body.status ) {
                    status = body.status;
                }
                if ( status === "error" ) {
                    console.log('status = error');
                    viewObj.error = httpResponse.statusMessage ;
                    this.result = viewObj;
                } else {
                    console.log('post return');
                    viewObj.data = body;
                    viewObj.datastr = bodyStr;
                    this.result = viewObj;
                }
            })
            .on('error', (err) => {
                console.log('error');
                viewObj.error = err;
                this.result = viewObj;
            });
        return this.result;
    }
}

module.exports = Site;
