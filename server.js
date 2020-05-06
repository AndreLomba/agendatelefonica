const express = require('express');

const server = express();

server.use(express.json());

const agenda = [
    {nome:"Fernando", numero:"17991996644", favorito:"S"},
    {nome:"Elieser", numero:"17991995599", favorito:"N"}
]

server.get('/agenda', function(request, response) {
    response.json(agenda);
});

server.post('/agenda', function(request, response) {

    const {nome,numero,favorito} = request.body;

    agenda.push({nome, numero,favorito});
    response.status(204).send();
});

server.listen(process.env.PORT || 3000);