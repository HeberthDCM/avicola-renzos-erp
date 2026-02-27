const router = require('express').Router()
const controller = require('../controllers/dashboardController')
const auth = require('../middlewares/authMiddleware')

router.get('/', auth, controller.index)

module.exports = router

