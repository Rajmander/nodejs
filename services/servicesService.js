import pool from "../config/db.js";
class ServicesService {
  async add(data) {
    console.log("Data >>>>>> ", data);

    // check duplication
    const sqlDupicate = `SELECT name from category WHERE name = '${data.name}' LIMIT 1`;
    console.log("SQL ", sqlDupicate);
    const [resultDuplicate] = await pool.query(sqlDupicate);
    console.log("resultDuplicate.length", resultDuplicate.length);

    if (resultDuplicate.length > 0) {
      return false;
    }

    const sql = `INSERT INTO category(name) VALUES('${data.name}')`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    return result;
  }

  async update(data) {
    console.log("Data >>>>>> ", data);

    // check duplication
    const sqlDupicate = `SELECT name from category WHERE name = '${data.name}' and id != ${data.id}`;
    console.log("SQL ", sqlDupicate);
    const [resultDuplicate] = await pool.query(sqlDupicate);
    console.log("resultDuplicate.length", resultDuplicate.length);

    if (resultDuplicate.length > 0) {
      return false;
    }

    const sql = `UPDATE category set name='${data.name}' WHERE id = ${data.id}`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    return result;
  }

  async show() {
    const sql = `SELECT id, name from category ORDER BY id desc`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    console.log("resultDuplicate.length", result.length);
    return result;
  }

  async delete(id) {
    console.log("Data >>>>>> ", id);

    const sql = `DELETE FROM category WHERE id = ${id}`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    return result;
  }
}
export default new ServicesService();
