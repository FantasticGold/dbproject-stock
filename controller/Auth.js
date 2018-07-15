import mysql from 'mysql';
import sqlconfig from '../config'
import { regExp_validate } from './validate';
import { passwdSha, compareSha } from './passwd-user';
import DBquery from './sqlquery';
export async function registerUser(ctx, next) {
    const { username : username, email : email, passwd : passwd} = ctx.request.body;  
    console.log(`username = ${username}, email = ${email}, passwd = ${passwd}`)
    const test1 = regExp_validate.usernameReg.test(username)
    const test2 = regExp_validate.lowpw.test(passwd)
    const test3 = regExp_validate.email.test(email)
    console.log(`email = ${test3}, pw = ${test2}, name = ${test1}`)
    if (!test1 || !test2 || !test3) {
    // if (false) {
        let errormsg = ''
        if (test3 == false) {
            errormsg = "邮箱格式不对"
        } else if (test1 == false) {
            errormsg = "用户名格式不对"
        } else {
            errormsg = "密码格式不对"
        }
        console.log('info error')
        ctx.body = {
            msg: errormsg,
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
    // console.log('user login')
    const { email, passwd } = ctx.request.body;
    // console.log(`email = ${email}, passwd = ${passwd}`)
    // console.log(`has = ${ctx.session.user.email}`)
    // console.log(`now = ${email}`)
    if (ctx.session.user && ctx.session.user.email === email) {
        ctx.body = {
            msg : 'already logined',
            state: false
        }
        return;
    }
    const sql = `select * from project.user where email = ?`;
    const arg = [email];
    const [ res ] = await DBquery(sql, arg);
    console.log('sql query start')
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
    console.log('sql query end')
}

export async function logout(ctx, next) {
    ctx.session = null;
    ctx.body = {
        msg: "success logout",
        status: true
    }
}

