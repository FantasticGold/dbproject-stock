import mysql from 'mysql';
import sqlconfig from '../config'
import { regExp_validate } from './validate';
import { passwdSha, compareSha } from './passwd-user';
import bluebird from "bluebird"


export async function isLogin(ctx, next){
    if (!ctx.session.user) {
        ctx.body = {
            msg: '未登录状态',
            state: false
        }
        return;
    }
    ctx.state.user = ctx.session.user;
    // console.log(ctx.state);
    return next();
}

export async function StockofUser(email) {
    var connection = mysql.createConnection(sqlconfig);
    connection.connect();
    const res = await (new Promise((resolve, reject) =>{
	    connection.query('SELECT * FROM project.userandstock where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    }))
    connection.end();
    return res;
}