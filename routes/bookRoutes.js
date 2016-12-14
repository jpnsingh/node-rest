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
            .use('/:bookId', function (request, response, next) {
                Book.findById(request.params.bookId, function (error, book) {
                    assert.equal(null, error);

                    if (!book) {
                        response
                            .status(404)
                            .send('No book found for the given _id');
                    } else {
                        request.book = book;
                        next();
                    }
                });
            });

        bookRouter
            .route('/:bookId')
            .get(function (request, response) {
                response.json(request.book);
            })
            .put(function (request, response) {
                request.book.name = request.body.name;
                request.book.author = request.body.author;
                request.book.genre = request.body.genre;
                request.book.read = request.body.read;

                request.book.save();

                response.json(request.book);
            })
            .patch(function (request, response) {
                if (request.body._id) {
                    delete request.body._id;
                }

                for (var key in request.body) {
                    request.book[key] = request.body[key];
                }

                request.book.save();

                response.json(request.book);
            })
            .delete(function (request, response) {
                request.book.remove();

                response.status(204).send('Removed');
            });

        return bookRouter;
    }
})();
