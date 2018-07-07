import mysql from 'mysql';
import sqlconfig from '../config'
import { regExp_validate } from './validate';
import { passwdSha, compareSha } from './passwd-user';
import DBquery from './sqlquery';
export async function registerUser(ctx, next) {
    const { username : username, email : email, passwd : passwd} = ctx.request.body;  
    console.log(`username = ${username}, email = ${email}, passwd = ${passwd}`)
    // if (!regExp_validate.usernameReg.test(username) || !regExp_validate.lowpw.test(passwd) || !regExp_validate.email.test(email)) {
    if (false) {
        console.log('info error')
        ctx.body = {
            msg: '输入信息有误',
            status: false
        }
        return false;
    }
    const existed = await userexisted(email);
    if (!existed) {
        console.log('email error')
        ctx.body = {
            msg: '该用户邮件已被注册',
            status: false
        }
        return false;
    }
    const pwd = passwdSha(passwd);
    const sql = `insert into project.user value(?, ?, ?)`;
    const arg = [username, email, pwd];
    await DBquery(sql, arg);
    ctx.body = {
        msg: '注册成功',
        status: true
    }
    return true;
}

export async function userexisted(email) {
    const sql = `select * from project.user where email = ?`;
    const arg = [email];
    const res = await DBquery(sql, arg);
    console.log('access')
    // console.log(res.length);
    return res.length == 0;
}

export async function userlogin(ctx, next) {
    if (ctx.session.user) {
        ctx.body = {
            msg : 'already logined',
            state: false
        }
        return;
    }
    const { email, passwd } = ctx.request.body;
    const sql = `select * from project.user where email = ?`;
    const arg = [email];
    const [ res ] = await DBquery(sql, arg);
    // console.log(res);
    if (res && compareSha(passwd, res["password"])) {
        ctx.session.user = {
            username: res["name"],
            email: email,
        };
        ctx.body = {
            msg: "success login",
            status: true
        };
    }else {
        ctx.body = {
            msg: "username or password wrong",
            status: false
        };
    }
}

export async function logout(ctx, next) {
    ctx.session = null;
    ctx.body = {
        msg: "success logout",
        status: true
    }
}

