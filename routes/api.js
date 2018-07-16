import Router  from 'koa-router'
import userrt from './user'
import stockrt from './stock'
import authrt from './auth'

const router = Router()

router.use('/users', userrt.routes())
router.use('/stock', stockrt.routes())
router.use('/auth', authrt.routes())
export default router