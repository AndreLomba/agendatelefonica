const express = require('express');

const server = express();

server.get('/', function(request, response) {
    response.send('Mundo de André!');
})

server.listen(process.env.PORT || 3000);