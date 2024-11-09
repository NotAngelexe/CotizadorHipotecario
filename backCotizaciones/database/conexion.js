import mysql from "mysql2";
const db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'contraseA1.',
  database:'cotizaciones'
});

db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log('Base de datos conectada')
});

export default db;
