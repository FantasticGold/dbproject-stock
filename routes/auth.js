import Router from 'koa-router'
import { registerUser, userlogin, logout } from "../controller/Auth"

const router = Router()

router.post('/register', registerUser);
router.post('/login', userlogin);
router.post('/logout', logout);

export default router;