const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "naman",
    database: "todo_database",
    port: 5432
});

module.exports = pool;