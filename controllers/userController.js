const db = require('../config/db')
const bcrypt = require('bcryptjs')
const audit = require('../middlewares/auditMiddleware')

exports.index = async (req,res)=>{
    const [users] = await db.query(`
        SELECT u.*, r.name as role 
        FROM users u 
        JOIN roles r ON r.id=u.role_id
    `)
    res.render('users/index',{users})
}

exports.createView = async (req,res)=>{
    const [roles] = await db.query("SELECT * FROM roles")
    res.render('users/form',{roles})
}

exports.store = async (req,res)=>{
    const {username,password,role_id} = req.body
    const hash = await bcrypt.hash(password,10)

    const [result] = await db.query(`
        INSERT INTO users (company_id,role_id,username,password)
        VALUES (1,?,?,?)`,
        [role_id,username,hash]
    )

    await audit(req.session.user.id,'CREATE','users',result.insertId)

    res.redirect('/users')
}

exports.delete = async (req,res)=>{
    await db.query("DELETE FROM users WHERE id=?",[req.params.id])
    res.redirect('/users')
}
