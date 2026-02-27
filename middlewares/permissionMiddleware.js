const db = require('../config/db')

module.exports = (module,action)=>{

return async(req,res,next)=>{

const user = req.session.user

const [rows] = await db.query(`
SELECT permissions.*
FROM role_permissions
JOIN permissions ON permissions.id=role_permissions.permission_id
WHERE role_permissions.role_id=?
AND permissions.module=?
AND permissions.action=?
`,
[user.role_id,module,action])

if(rows.length==0){

return res.status(403).send("Sin permiso")

}

next()

}

}
