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
            var query = {};

            if (request.query.genre) {
                query.genre = request.query.genre;
            }

            Book.find(query, function (error, books) {
                assert.equal(null, error);

                response.json(books);
            });
        });

    bookRouter
        .route('/books/:bookId')
        .get(function (request, response) {
            Book.findById(request.params.bookId, function (error, book) {
                assert.equal(null, error);

                response.json(book);
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
