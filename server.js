const express = require('express');
const server = express();

// PROCURAR PELO HEROKU POSTGREES NO HEROKU E PEGAR AS CONFIGURAÇÕES DO BD
const Pool = require('pg').Pool;
const cors = require('cors');

// CONEXÃO COM BD
const pool = new Pool({
    user: 'bmultoamrhbtkq',
    password: 'bd5bf18c704917e098dd541ac031db4a1a4a4a3605211ce60ebafeccde7552f0',
    host: 'ec2-54-175-117-212.compute-1.amazonaws.com',
    database: 'd19t31tggc8vvd',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

server.use(cors());
server.use(express.json());
// EXIBE O QUE EXISTE NA TABELA "AGENDA"
// DEVEMOS USAR O ASYC AWAIT PARA QUE SÓ RETORNE APÓS O SELECT FOR FEITO NO BANCO
server.get('/agenda', async function(request, response) {
    const result = await pool.query('SELECT * FROM agenda ORDER BY id');
    return response.json(result.rows);
});

// INSERE OS DADOS RECEBIDOS POR POST NA TABELA "AGENDA"
server.post('/agenda', async function(request, response) {

    // PEGA OS VALORES QUE ESTÃO NO request.body
    const {nome,numero,favorito} = request.body;

    const sql = `INSERT INTO agenda (nome,numero,favorito) VALUES ($1, $2, $3)`;
    await pool.query(sql, [nome,numero,favorito]);
    return response.status(204).send();
});

// ATUALIZA UM PRODUTO PELO SEU ID
server.put('/contato/:id', async (request, response) => {
    const {id} = request.params;
    const {nome,numero,favorito} = request.body;
    const sql = `UPDATE agenda SET nome = $1, numero = $2, favorito = $3 WHERE id = $4`;
    await pool.query(sql, [nome,numero,favorito,id]);
    return response.status(204).send();
})

// DELETA UM PRODUTO PELO SEU ID
server.delete('/contato/:id', async (request, response) => {
    const {id} = request.params;
    const sql = `DELETE FROM agenda WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
});

// BUSCA CONTATO
server.get('/contato/:id', async function(request, response) {
    const {id} = request.params;
    const sql = `SELECT * FROM agenda WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
});


server.listen(process.env.PORT || 3000);