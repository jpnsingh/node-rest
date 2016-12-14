(function () {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var authorModel = new Schema({
        name: {type: String},
        gender: {type: String},
        age: {type: Number}
    });

    module.exports = mongoose.model('Author', authorModel);
})();
