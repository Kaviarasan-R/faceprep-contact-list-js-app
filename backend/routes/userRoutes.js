const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    forgotUser
} = require('../controllers/userControllers')
const { protect } = require('../middleware/auth')


router
    .post('/register', registerUser)
    .post('/login', loginUser)
router.put('/forgot-password', forgotUser)

module.exports = router