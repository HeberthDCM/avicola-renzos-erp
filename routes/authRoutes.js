const router = require('express').Router()
const controller = require('../controllers/authController')

router.get('/',controller.loginView)
router.post('/login',controller.login)
router.get('/logout',controller.logout)

module.exports = router
