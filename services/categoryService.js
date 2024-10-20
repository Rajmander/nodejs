import pool from "../config/db.js";
class CategoryService {
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

    // check duplication
    const sqlDupicate = `SELECT category_id from services WHERE category_id = ${id}`;
    console.log("SQL ", sqlDupicate);
    const [resultDuplicate] = await pool.query(sqlDupicate);
    console.log("resultDuplicate.length", resultDuplicate.length);

    if (resultDuplicate.length > 0) {
      return false;
    }

    const sql = `DELETE FROM category WHERE id = ${id}`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    return result;
  }

  async addService(data) {
    console.log("Data >>>>>> ", data);

    // check duplication
    const sqlDupicate = `SELECT service_name from services WHERE service_name = '${data.service_name}' AND category_id = ${data.categoryId}  LIMIT 1`;
    console.log("SQL ", sqlDupicate);
    const [resultDuplicate] = await pool.query(sqlDupicate);
    console.log("resultDuplicate.length", resultDuplicate.length);

    if (resultDuplicate.length > 0) {
      return false;
    }

    const sql = `INSERT INTO services(service_name, type, category_id) VALUES('${data.service_name}','${data.type}', ${data.categoryId} )`;
    console.log("SQL ", sql);
    const [result] = await pool.query(sql);

    console.log("result +++++++++++++", result);

    if (result.affectedRows > 0) {
      console.log("hihhihhihihih");
      const service_id = result.insertId;
      const sqlServiceOptions = `INSERT INTO service_prices(service_id, price, duration) VALUES(${service_id},${data.price}, '${data.duration}' )`;
      await pool.query(sqlServiceOptions);
    }
    return result;
  }

  async showService(categoryId) {
    const sql = `SELECT SER.id, SER.service_name, SER.category_id, SER.type, SP.price, SP.duration from services as SER
    JOIN service_prices SP ON SER.id = SP.service_id WHERE SER.category_id=${categoryId}`;

    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    console.log("resultDuplicate.length", result.length);
    return result;
  }

  async updateService(data) {
    console.log("Data >>>>>> ", data);
    const sql = `UPDATE services SV
    JOIN service_prices SP ON SV.id = SP.service_id
    set SV.service_name='${data.service_name}', SV.type='${data.type}',
    SP.price=${data.price},SP.duration='${data.duration}'
    WHERE SV.id = ${data.serviceId} AND SV.category_id = ${data.categoryId} AND SP.service_id = ${data.serviceId}`;

    console.log("SQL ", sql);
    const [result] = await pool.query(sql);
    return result;
  }

  async deleteService(data) {
    console.log("Data >>>>>> ", data);
    const serviceSql = `DELETE FROM service_prices
    WHERE service_id=${data.serviceId}`;

    //SV.category_id = ${data.categoryId}

    console.log("SQL ", serviceSql);
    const [result] = await pool.query(serviceSql);
    if (result.affectedRows > 0) {
      const servicePricesSql = `DELETE FROM services 
    WHERE id=${data.serviceId} AND category_id=${data.categoryId}`;
      const [result] = await pool.query(servicePricesSql);
    }
    return result;
  }
}
export default new CategoryService();
