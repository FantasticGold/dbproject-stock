import mysql from 'mysql';
import sqlconfig from '../config'

export default async function DBquery(sql, arg) {
    
    var connection = mysql.createConnection(sqlconfig);
    connection.connect();
    return await new Promise((resolve, reject)=>{
        connection.query(sql, arg,  function (error, results, fields) {
            if (error) {
                reject(error);
            }
            connection.end();
            resolve(results);
        });
    });
}