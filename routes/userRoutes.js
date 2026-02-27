const router = require('express').Router()
const controller = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')
const permission = require('../middlewares/permissionMiddleware')

router.get('/',auth,permission('users','read'),controller.index)
router.get('/create',auth,permission('users','create'),controller.createView)
router.post('/',auth,permission('users','create'),controller.store)
router.delete('/:id',auth,permission('users','delete'),controller.delete)

module.exports = router
