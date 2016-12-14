(function () {
    'use strict';

    var express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        app = express(),
        port = process.env.PORT || 8090;

    var db = mongoose.connect('mongodb://localhost:27017/bookApi');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/api/books', require('./routes/bookRoutes')());
    app.use('/api/authors', require('./routes/authorRoutes')());

    app.get('/', function (request, response) {
        response.send('Welcome to my API!!');
    });

    app.listen(port, function () {
        console.log('Server running on %s', port);
    });
})();
