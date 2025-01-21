const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
// controller

router.get('/login', AuthController.login)
router.get('/register', AuthController.register )
router.get('/logout', AuthController.logout)
router.post('/register', AuthController.registerPost)


module.exports = router
