const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors);
app.use(express.json()); //Informa ao express que sera utilizado o formato JSON nas requisicoes
app.use(routes);
/**
 * Rota / Recurso
 *
 * Metodos HTTP:
 *  - GET: Buscar uma informação do Backend
 *  - POST: Criar uma informação do Backend
 *  - PUT: Editar uma informação do Backend
 *  - DELETE: Exlcuir uma informação do Backend 
 * 
 * Parametros:
 * 
 * Query Params: Parametros nomeados enviados na rota após o '?' (Filtros, paginacao)
 * Route Params: Parametros utilizados para identificar recursos
 * Request Body: Corpo na requisicao, utilizado para criar ou alterar recursos
 * 
 * SQL: MySQL, SQLite, PostgresSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 * 
 * 
 * Configuracao Banco
 * Driver: SELECT * FROM users;
 * Query Build: table('users').select('*').where();
 */


app.listen(3333);