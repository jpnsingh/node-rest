(function () {
    'use strict';

    var express = require('express'),
        mongoose = require('mongoose'),
        assert = require('assert'),
        app = express(),
        port = process.env.PORT || 8090;

    var db = mongoose.connect('mongodb://localhost:27017/bookApi');
    var Book = require('./models/bookModel');

    var bookRouter = express.Router();

    bookRouter
        .route('/books')
        .get(function (request, response) {
            // var responseJson = {hello: 'This is my book API'};

            Book.find(function (error, books) {
                assert.equal(null, error);

                response.json(books);
            });
        });

    app.use('/api', bookRouter);

    app.get('/', function (request, response) {
        response.send('Welcome to my API!!');
    });

    app.listen(port, function () {
        console.log('Server running on %s', port);
    });
})();
