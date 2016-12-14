(function () {
    'use strict';

    var express = require('express'),
        Book = require('../models/bookModel'),
        bookController = require('../controllers/bookController')(Book);

    module.exports = bookRoutes;

    function bookRoutes() {
        var bookRouter = express.Router();

        bookRouter
            .route('/')
            .post(bookController.post)
            .get(bookController.get);

        bookRouter
            .use('/:bookId', bookController.middleware);

        bookRouter
            .route('/:bookId')
            .get(bookController.getById)
            .put(bookController.put)
            .patch(bookController.patch)
            .delete(bookController.remove);

        return bookRouter;
    }
})();
