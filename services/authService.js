import pool from "../config/db.js";
class AuthService {
  async login(data) {
    console.log("Data >>>>>> ", data);
    const sql = `SELECT id, email from users WHERE email = '${data.email}' AND password = '${data.password}' LIMIT 1`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    return result;
  }
}
export default new AuthService();
