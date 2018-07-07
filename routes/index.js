import signuprt from './signup'
import mainrt from './main'
import userinfort from './userinfo'
import Router from 'koa-router'
import apirt from './api'

const router = Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Haide!'
  })
})

router.use('/userinfo', userinfort.routes());
router.use('/main', mainrt.routes());
router.use('/signup', signuprt.routes());

router.use('/api', apirt.routes());

export default router
