const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const audit = require('../middlewares/auditMiddleware')

exports.index = async(req,res)=>{

const users = await User.getAll()

res.render('users/index',{users})

}

exports.createView = async(req,res)=>{

const roles = await Role.getAll()

res.render('users/create',{roles})

}

exports.create = async(req,res)=>{

const hash = await bcrypt.hash(req.body.password,10)

await User.create({

company_id:1,
role_id:req.body.role_id,
username:req.body.username,
password:hash

})

await audit(req.session.user.id,"create","users",0)

res.redirect('/users')

}

exports.editView = async(req,res)=>{

const user = await User.getById(req.params.id)

const roles = await Role.getAll()

res.render('users/edit',{user,roles})

}

exports.update = async(req,res)=>{

await User.update(req.params.id,req.body)

await audit(req.session.user.id,"update","users",req.params.id)

res.redirect('/users')

}

exports.delete = async(req,res)=>{

await User.delete(req.params.id)

await audit(req.session.user.id,"delete","users",req.params.id)

res.redirect('/users')

}
