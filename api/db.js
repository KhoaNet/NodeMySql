const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "database_name",
    port: 3308,
    multipleStatements: true,//query many,
    Promise: bluebird
};

module.exports = {
    // Ham config
    excuteBySql: async (sql) => {
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql);
        await con.end();
        return rows;
    },
    excuteBySqlByParams: async (sql, params) => {
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql, params);
        await con.end();
        return rows;
    },
    getNoByTableName: async (tableName) => {
        let con = await mysql.createConnection(config);
        let sql = `SELECT COUNT(*) as sum FROM ${tableName}`;
        let [rows] = await con.execute(sql);
        await con.end();
        if (rows[0]) {
            let num = ("000" + rows[0].sum).slice(-3);
            const date = moment().format('UDDMMYYYY');
            return date + num;
        }
        return null;
    },
    getById: async (id, tableName) => {
        let idName = tableName.substring(0, tableName.length - 1);
        let sql = `Select * from ${tableName} where ${idName + "ID"}=${id}`;
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql);
        await con.end();
        return rows;
    },
    getByFkId: async (value, nameColFK, tableName) => {
        let sql = `Select * from ${tableName} where ${nameColFK}=${value}`;
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql);
        await con.end();
        return rows;
    },
    getByColName: async (value, nameCol, tableName) => {
        let sql = `Select * from ${tableName} where ${nameCol}='${value}'`;
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql);
        await con.end();
        return rows;
    },
    updatebyId: async (value, nameCol, tableName, id) => {
        let idName = tableName.substring(0, tableName.length - 1);
        let sql = `Update ${tableName} set ${nameCol}='${value}'where ${idName + "ID"}=${id} `
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql);
        await con.end();
        return rows;
    },
    updatebyColName: async (valueColSet, colSet, tableName, colWhe, valueColWhe) => {
        let sql = `Update ${tableName} set ${colSet}='${valueColSet}'where ${colWhe}=${valueColWhe} `
        let con = await mysql.createConnection(config);
        let [rows] = await con.execute(sql);
        await con.end();
        return rows;
    }
}