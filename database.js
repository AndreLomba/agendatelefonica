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
