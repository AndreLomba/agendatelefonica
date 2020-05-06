const express = require('express');
const server = express();

// PROCURAR PELO HEROKU POSTGREES NO HEROKU E PEGAR AS CONFIGURAÇÕES DO BD
const Pool = require('pg').Pool;

// CONEXÃO COM BD
const pool = new Pool({
    user: 'wpuysxguveoexk',
    password: '63223581205e41466e48ad2e06498faddf2950d1089ab1d4e7285194f6e0b419',
    host: 'ec2-54-86-170-8.compute-1.amazonaws.com',
    database: 'deii1sq7jdsmtu',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});


server.use(express.json());

// EXIBE O QUE EXISTE NA TABELA "AGENDA"
// DEVEMOS USAR O ASYC AWAIT PARA QUE SÓ RETORNE APÓS O SELECT FOR FEITO NO BANCO
server.get('/agenda', async function(request, response) {
    const result = await pool.query('SELECT * FROM agenda');
    return response.json(result.rows);
});

// INSERE OS DADOS RECEBIDOS POR POST NA TABELA "AGENDA"
server.post('/agenda', async function(request, response) {

    // PEGA OS VALORES DO POST QUE ESTÃO NO request.body
    const {nome,numero,favorito} = request.body;

    const sql = `INSERT INTO agenda (nome,numero,favorito) VALUES ($1, $2, $3)`;
    await pool.query(sql, [nome,numero,favorito]);
    return response.status(204).send();
});

server.listen(process.env.PORT || 3000);