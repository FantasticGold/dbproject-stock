import Router from 'koa-router'
import { registerUser, userlogin, StockofUser } from "../controller/user"

const router = Router()

router.post('/register', async (ctx, next) => {
    const { username : username, email : email, passwd : passwd} = ctx.request.body;
    ctx.body = await registerUser(username, email, passwd);
});

router.post('/login', async (ctx, next) => {
    const { email : email, passwd : passwd} = ctx.request.body;
    ctx.body = await userlogin(email, passwd);
});

router.get('/prefer', async (ctx, next) => {
    const { email : email } = ctx.request.query;
    ctx.body = await StockofUser(email);
});

export default router;