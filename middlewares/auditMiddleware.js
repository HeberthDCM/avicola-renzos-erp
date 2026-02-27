const db = require('../config/db')

module.exports = async(user_id,action,table,id)=>{

await db.query(`
INSERT INTO audit_log(user_id,action,table_name,record_id)
VALUES(?,?,?,?)
`,[user_id,action,table,id])

}
