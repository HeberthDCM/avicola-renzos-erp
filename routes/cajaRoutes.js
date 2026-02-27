const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Caja funcionando')
})

module.exports = router