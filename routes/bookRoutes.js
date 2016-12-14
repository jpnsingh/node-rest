(function () {
    'use strict';

    var express = require('express'),
        assert = require('assert'),
        Book = require('../models/bookModel');

    module.exports = bookRoutes;

    function bookRoutes() {
        var bookRouter = express.Router();

        bookRouter
            .route('/')
            .post(function (request, response) {
                var book = new Book(request.body);
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
            })
            .put(function (request, response) {
                Book.findById(request.params.bookId, function (error, book) {
                    assert.equal(null, error);

                    book.name = request.body.name;
                    book.author = request.body.author;
                    book.genre = request.body.genre;
                    book.read = request.body.read;

                    book.save();

                    response.json(book);
                });
            });

        return bookRouter;
    }
})();
