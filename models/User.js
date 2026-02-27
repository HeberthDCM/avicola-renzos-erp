const db = require('../config/db')

exports.getAll = async()=>{

const [rows] = await db.query(`
SELECT users.*,roles.name role
FROM users
JOIN roles ON roles.id=users.role_id
`)

return rows

}

exports.getById = async(id)=>{

const [rows] = await db.query(
"SELECT * FROM users WHERE id=?",[id])

return rows[0]

}

exports.create = async(data)=>{

await db.query(`
INSERT INTO users(company_id,role_id,username,password,status)
VALUES(?,?,?,?,1)
`,[

data.company_id,
data.role_id,
data.username,
data.password

])

}

exports.update = async(id,data)=>{

await db.query(`
UPDATE users SET role_id=?,username=? WHERE id=?
`,[
data.role_id,
data.username,
id
])

}

exports.delete = async(id)=>{

await db.query("DELETE FROM users WHERE id=?",[id])

}