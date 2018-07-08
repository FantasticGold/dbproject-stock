import Router  from 'koa-router'
const router = Router()

router.get('/', async (ctx, next) => {
    await ctx.render('Aboutus', {
        title: 'About'
    })
});

router.get('/donate', async (ctx, next) => {
    await ctx.render('donate', {
        title: 'donate'
    })
});

export default router