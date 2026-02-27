const db = require('../config/db')

/* exports.index = async (req,res)=>{
    const [[{total}]] = await db.query(`
        SELECT IFNULL(SUM(amount),0) as total 
        FROM cash_movements 
        WHERE DATE(created_at)=CURDATE()
    `)

    res.render('dashboard',{totalCaja:total})
}
 */

exports.index = (req,res)=>{
    res.render('layouts/main',{
        body: require('ejs').render(
            require('fs').readFileSync('./views/dashboard/index.ejs','utf8'),
            { user: req.session.user }
        )
    })
}