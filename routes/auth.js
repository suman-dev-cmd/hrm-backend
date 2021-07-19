const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
} = require('../controllers/authController')
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)


module.exports = router