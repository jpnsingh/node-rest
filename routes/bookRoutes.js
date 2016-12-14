(function () {
    'use strict';

    var express = require('express'),
        assert = require('assert'),
        Book = require('../models/bookModel');

    module.exports = Routes;

    function Routes() {
        var bookRouter = express.Router();

        bookRouter
            .route('/')
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
            .route('/:bookId')
            .get(function (request, response) {
                Book.findById(request.params.bookId, function (error, book) {
                    assert.equal(null, error);

                    response.json(book);
                });
            });

        return bookRouter;
    }
})();
