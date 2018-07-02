import Router from 'koa-router'
import { StockofUser, isLogin } from "../controller/user"

const router = Router()

router.use(isLogin);

router.get('/prefer', async (ctx, next) => {
    const { email : email } = ctx.request.query;
    ctx.body = await StockofUser(email);
});

export default router;