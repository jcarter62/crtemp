'use strict';

require('dotenv').config();

class Settings {
    constructor() {
        this._port = this.normalizePort(process.env.PORT || '3000');
        // this._dbConfig = {
        //     "user": process.env.SQL_USER,
        //     "password": process.env.SQL_PASS ,
        //     "server":process.env.SQL_HOST,
        //     "database":process.env.SQL_DB,
        //     "options": {
        //         "instanceName":process.env.SQL_INSTANCE,
        //         "encrypt":false
        //     }
        // };

        // this._sqlitedb = process.env.SQLITE_DB;

        this._debug = false;
        if ( ( process.env.APP_DEBUG ).toLowerCase() == 'true' ) {
            this._debug = true;
        }

        this._sensorURL = '';
        if ( process.env.Sensor_URL ) {
            this._sensorURL = process.env.Sensor_URL;
        }
    }

    normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }


    get port() {
        return this._port;
    }

    get sensorURL() {
        return this._sensorURL;
    }

    // get dbConfig() {
    //     return this._dbConfig;
    // }
    //
    // get sqlitedb() {
    //     return this._sqlitedb;
    // }

    get debug() {
        return this._debug;
    }
}

module.exports = Settings;
