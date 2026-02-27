const db = require('../config/db')

exports.getAll = async()=>{

const [rows] = await db.query("SELECT * FROM roles")

return rows

}

exports.create = async(name)=>{

await db.query(
"INSERT INTO roles(name) VALUES(?)",[name])

}