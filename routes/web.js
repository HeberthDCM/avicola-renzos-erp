const router = require('express').Router()

const auth = require('../middlewares/authMiddleware')

router.use('/',require('./authRoutes'))

router.use('/dashboard',auth,require('./dashboardRoutes'))

router.use('/users',auth,require('./userRoutes'))

router.use('/roles',auth,require('./roleRoutes'))

router.use('/caja',auth,require('./cajaRoutes'))

module.exports = router 



// verificador
/* const router = require('express').Router()

const auth = require('../middlewares/authMiddleware')

const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const userRoutes = require('./userRoutes')
const roleRoutes = require('./roleRoutes')
const cajaRoutes = require('./cajaRoutes')

console.log('authRoutes:', typeof authRoutes)
console.log('dashboardRoutes:', typeof dashboardRoutes)
console.log('userRoutes:', typeof userRoutes)
console.log('roleRoutes:', typeof roleRoutes)
console.log('cajaRoutes:', typeof cajaRoutes)

router.use('/', authRoutes)
router.use('/dashboard', auth, dashboardRoutes)
router.use('/users', auth, userRoutes)
router.use('/roles', auth, roleRoutes)
router.use('/caja', auth, cajaRoutes)

module.exports = router */