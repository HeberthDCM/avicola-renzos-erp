const express = require('express')
const router = express.Router()

const controller = require('../controllers/roleController')
const auth = require('../middlewares/authMiddleware')

router.get('/', auth, controller.index)
router.get('/create', auth, controller.create)
router.post('/store', auth, controller.store)
router.get('/edit/:id', auth, controller.edit)
router.post('/update/:id', auth, controller.update)
router.post('/delete/:id', auth, controller.delete)

module.exports = router