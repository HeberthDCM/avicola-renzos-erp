const db = require('../config/db')
const bcrypt = require('bcryptjs')

exports.loginView = (req,res)=>{

res.render('auth/login',{
layout:false,
error:req.flash('error')
})

}

exports.login = async(req,res)=>{

const {username,password} = req.body

const [rows] = await db.query(
"SELECT * FROM users WHERE username=?",[username])

if(rows.length==0){

req.flash('error','Usuario no existe')

return res.redirect('/login')

}

const user = rows[0]

const valid = await bcrypt.compare(password,user.password)

if(!valid){

req.flash('error','Password incorrecto')

return res.redirect('/login')

}

req.session.user=user

res.redirect('/dashboard')

}

exports.logout = (req,res)=>{

req.session.destroy()

res.redirect('/login')

}