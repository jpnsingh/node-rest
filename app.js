(function () {
    'use strict';

    var express = require('express'),
        app = express(),
        port = process.env.PORT || 8090;

    app.get('/', function (request, response) {
        response.send('Welcome to my API!!');
    });

    app.listen(port, function () {
        console.log('Server running on %s', port);
    });
})();
