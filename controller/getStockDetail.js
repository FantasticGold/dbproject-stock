import mysql from 'mysql';
import sqlconfig from '../config';
import DBquery from './sqlquery';
export async function querybystr(code, name, num = 10) {
    
    var connection = mysql.createConnection(sqlconfig);
    
    connection.connect();
    const codemodel = '%' + code + '%';
    const namemodel = '%' + name + '%';
    const res = await (new Promise((resolve, reject) =>{
	    connection.query('select * from project.stock_data where (code like ? or name like ?) and valid = 1 order by code desc LIMIT ?;', [codemodel, namemodel, num] , function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	        });
    }))
    connection.end();
    return res;
}

export async function getCompany(code) {
    console.log(`getcompany: ${code}`)
    const sql = `SELECT stock_source FROM project.stock_data WHERE stock_data.code = ?`;
    // const sql = `SELECT * FROM project.stock_data, project.cod where ` + 
    //             `project.stock_data.code = ? ` + 
    //             `and project.stock_data.stock_source = project.cod.id`;
    const arg = [code];
    const res = await DBquery(sql, arg)
    console.log(res)
    // const sql2 = `SELECT name FROM project.cod WHERE cid = ?`;
    // const arg2 = [res]
    // return await DBquery(sql2, arg2)
    return res
}

export async function getdetail(code) {
    const sql = `SELECT time, open, close, high, low, volume FROM project.maindata where code = ?`;
    const arg = [code];
    return await DBquery(sql, arg);
}