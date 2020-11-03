const Pool = require("pg").Pool;

const pool= new Pool({
    user:"postgres",
    password:"madhav123",
    host:"localhost",
    port: 5432,
    database:"airportdbms"
});

module.exports=pool;