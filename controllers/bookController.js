(function () {
    'use strict';

    var assert = require('assert');

    module.exports = BookController;

    function BookController(Book) {
        return {
            get: get,
            getById: getById,
            post: post,
            put: put,
            patch: patch,
            remove: remove,
            middleware: middleware
        };

        function get(request, response) {
            var query = {};

            if (request.query.genre) {
                query.genre = request.query.genre;
            }

            Book.find(query, function (error, books) {
                assert.equal(null, error);

                response.json(books);
            });
        }

        function getById(request, response) {
            response.json(request.book);
        }

        function post(request, response) {
            var book = new Book(request.body);
            book.save();

            response
                .status(201)
                .send(book);

        }

        function put(request, response) {
            request.book.name = request.body.name;
            request.book.author = request.body.author;
            request.book.genre = request.body.genre;
            request.book.read = request.body.read;

            request.book.save();

            response.json(request.book);
        }

        function patch(request, response) {
            if (request.body._id) {
                delete request.body._id;
            }

            for (var key in request.body) {
                request.book[key] = request.body[key];
            }

            request.book.save();

            response.json(request.book);
        }

        function remove(request, response) {
            request.book.remove();

            response.status(204).send('Removed');
        }

        function middleware(request, response, next) {
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
        }
    }
})();