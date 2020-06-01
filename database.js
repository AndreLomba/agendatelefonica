const Pool = require('pg').Pool;

// CONEXÃO COM BD
const pool = new Pool({
    user: 'bmultoamrhbtkq',
    password: 'bd5bf18c704917e098dd541ac031db4a1a4a4a3605211ce60ebafeccde7552f0',
    host: 'ec2-54-175-117-212.compute-1.amazonaws.com',
    database: 'd19t31tggc8vvd',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

const sql = `
    -- CREATE TYPE enum_sn AS ENUM('S', 'N');

    CREATE TABLE IF NOT EXISTS agenda 
    (
        ID serial primary key,
        nome varchar(200) not null,
        numero varchar(200) not null,
        favorito enum_sn
    )
`;

// ABRE CONEXÃO, CRIA TABELA NO POSTGRE E JÁ FECHA A CONEXÃO
pool.query(sql, function(error, result) {
    if(error)
        throw error;
});
