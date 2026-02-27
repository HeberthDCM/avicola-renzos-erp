const db = require('../config/db')

module.exports = function(module,action){
    return async (req,res,next)=>{
        const role_id = req.session.user.role_id
        
        const [rows] = await db.query(`
            SELECT p.* FROM permissions p
            JOIN role_permissions rp ON rp.permission_id=p.id
            WHERE rp.role_id=? AND p.module=? AND p.action=?`,
            [role_id,module,action]
        )

        if(rows.length>0) return next()

        req.flash('error','No tiene permisos')
        return res.redirect('/dashboard')
    }
}
