(function () {
    'use strict';

    var should = require('should'),
        request = require('supertest'),
        app = require('../../../app'),
        mongoose = require('mongoose'),
        Book = mongoose.model('Book'),
        agent = request.agent(app);

    describe('Book CRUD test', function () {
        it('should allow a book to be posted and return a read and _id fields', function (done) {
            var bookPost = {
                name: 'Test Book 1',
                author: 'Test Author 1',
                genre: 'Test Genre 1'
            };

            agent.post('/api/books')
                .send(bookPost)
                .expect(200)
                .end(function (err, result) {
                    result.body.read.should.equal(false);
                    result.body.should.have.property('_id');
                    done();
                });
        });

        afterEach(function (done) {
            Book.remove().exec();
            done();
        })
    });
})();