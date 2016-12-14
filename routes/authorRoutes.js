(function () {
    'use strict';

    var express = require('express'),
        assert = require('assert'),
        Author = require('../models/authorModel');

    module.exports = authorRoutes;

    function authorRoutes() {
        var authorRouter = express.Router();

        authorRouter
            .route('/')
            .post(function (request, response) {
                var author = new Author(request.body);

                author.save();

                response
                    .status(201)
                    .send(author);

            })
            .get(function (request, response) {
                Author.find(query, function (error, authors) {
                    assert.equal(null, error);

                    response.json(authors);
                });
            });

        authorRouter
            .route('/:authorId')
            .get(function (request, response) {
                Author.findById(request.params.authorId, function (error, author) {
                    assert.equal(null, error);

                    response.json(author);
                });
            });

        return authorRouter;
    }
})();
