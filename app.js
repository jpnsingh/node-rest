(function () {
    'use strict';

    var express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        assert = require('assert'),
        app = express(),
        port = process.env.PORT || 8090;

    var db = mongoose.connect('mongodb://localhost:27017/bookApi');
    var Book = require('./models/bookModel');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    var bookRouter = express.Router();

    bookRouter
        .route('/books')
        .post(function (request, response) {
            var book = new Book(request.body);

            console.log(book);

            book.save();

            response
                .status(201)
                .send(book);

        })
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
        .route('/book/:bookId')
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
