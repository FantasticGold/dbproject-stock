import mysql from 'mysql';
import sqlconfig from '../config'
import { resolve } from 'path';
export async function getdetail(code, name, num = 10) {
    
    var connection = mysql.createConnection(sqlconfig);
    
    connection.connect();
    const codemodel = '%' + code + '%';
    const namemodel = '%' + name + '%';
    const res = await (new Promise((resolve,reject) =>{
	    connection.query('select * from project.stock_data where (code like ? or name like ?) and valid = 1 order by code desc LIMIT ?;', [codemodel, namemodel, num] , function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	        });
    }))
    connection.end();
    return res;
}