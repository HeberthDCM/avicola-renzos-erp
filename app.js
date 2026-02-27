require('dotenv').config()
const express = require('express')
const session = require('express-session')
const path = require('path')
const flash = require('connect-flash')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
    secret:'renzos_secret',
    resave:false,
    saveUninitialized:false
}))

app.use(flash())

app.use((req,res,next)=>{
    res.locals.user = req.session.user || null
    res.locals.messages = req.flash()
    next()
})

app.use(require('./routes/authRoutes'))
app.use('/dashboard',require('./routes/dashboardRoutes'))
app.use('/users',require('./routes/userRoutes'))
app.use('/cashbox',require('./routes/cashboxRoutes'))

app.listen(3000,()=>console.log("ERP AVICOLA RENZOS RUNNING"))
