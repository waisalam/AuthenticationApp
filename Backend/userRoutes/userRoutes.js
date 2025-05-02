import express from 'express'
import { changePassword, loginUser, logoutUser, registerUser, verifyUserEmail } from '../controllers/usercontroller.js'
import { body } from 'express-validator';

const router = express.Router();

router.post('/register',[
body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 characters'),
body('fullname.lastname').isLength({min:3}).withMessage('firstname must be at least 3 characters'),
body('email').isEmail().withMessage('Invalid Email'),
body('password').isStrongPassword().isLength({min:6}).withMessage('password must be at least 6 characters')
],registerUser)

router.post('/verify-email',verifyUserEmail)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters')
    ],loginUser)

    router.post('/logout',logoutUser)

    router.post('/change-password',changePassword)


export default router
