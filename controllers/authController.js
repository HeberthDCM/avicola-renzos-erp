const db = require('../config/db')
const bcrypt = require('bcryptjs')

/* exports.loginView = (req,res)=>{
    res.render('auth/login',{layout:false})
} */

exports.loginView = (req,res)=>{
    res.render('auth/login',{
        error: req.flash('error')
    })
}

exports.login = async (req,res)=>{
    const {username,password} = req.body

    console.log("Login intento",username, password) //

    const [rows] = await db.query("SELECT * FROM users WHERE username=? AND status=1",[username])

    console.log("USUARIO EN BD:", rows) //

    if(rows.length==0){
        req.flash('error','Usuario no existe')
        return res.redirect('/')
    }

    const user = rows[0]

    const valid = await bcrypt.compare(password,user.password)

    console.log("PASSWORD VALIDO:", valid)

    if(!valid){
        req.flash('error','Contraseña incorrecta')
        return res.redirect('/')
    }

    req.session.user = user
    res.redirect('/dashboard')
}

exports.logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
