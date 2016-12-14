(function () {
    'use strict';

    var should = require('should'),
        sinon = require('sinon');


    describe('Test: BookController', function () {
        describe('Post', function () {
            it('should not allow an empty title on post', function () {
                var Book = function (book) {
                    this.save = function () {

                    };
                };

                var request = {
                    body: {
                        author: 'Test Author'
                    }
                };

                var response = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };

                var bookController = require('../../../controllers/bookController')(Book);

                bookController.post(request, response);

                response.status.calledWith(400).should.equal(true, 'Bad Status', response.status.args[0][0]);

                response.send.calledWith('Book name is required').should.equal(true);
            });
        });
    });
})();
