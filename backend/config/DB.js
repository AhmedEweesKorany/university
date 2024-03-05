const mysql = require("mysql2");
require("dotenv").config();

const db_server = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "university",
  waitForConnections: true,
});
db_server.on("error",(e)=>{
    console.log("error happend",e)
})


module.exports = db_server