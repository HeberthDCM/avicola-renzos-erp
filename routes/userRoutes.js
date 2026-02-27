const router = require('express').Router()

const controller = require('../controllers/userController')

const permission = require('../middlewares/permissionMiddleware')

router.get('/',
permission('users','view'),
controller.index)

router.get('/create',
permission('users','create'),
controller.createView)

router.post('/create',
permission('users','create'),
controller.create)

router.get('/edit/:id',
permission('users','edit'),
controller.editView)

router.post('/edit/:id',
permission('users','edit'),
controller.update)

router.get('/delete/:id',
permission('users','delete'),
controller.delete)

module.exports = router