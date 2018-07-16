import Router  from 'koa-router'
import { getCompany, getdetail } from '../controller/getStockDetail'
const router = Router()

router.get('/detail', async (ctx, next) => {
    const { code : code } = ctx.request.query;
    ctx.body = await getdetail(code)
});

router.get('/search', async (ctx, next) => {
    await ctx.render('searchforStock', {
        title: 'Search!'
    })
});

router.get('/index', async (ctx, next) => {
    await ctx.render('stockindex', {
        title: 'Stock Index'
    })
});

router.get('/company', async (ctx, next) => {
    const { code : code } = ctx.request.query;
    ctx.body = await getCompany(code)
});

export default router