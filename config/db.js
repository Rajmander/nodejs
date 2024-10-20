import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql2
  .createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
  })
  .promise();

export default pool;
