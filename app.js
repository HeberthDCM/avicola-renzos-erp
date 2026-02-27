/* require('dotenv').config()
const express = require('express')
const session = require('express-session')
const path = require('path')
const flash = require('connect-flash')

const app = express()
const expressLayouts = require('express-ejs-layouts') // instle layouts

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

app.use(expressLayouts) // use layouts

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

app.set('layout','layouts/main') // set main layout as default

 */

const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const layouts = require('express-ejs-layouts')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
secret: process.env.SESSION_SECRET,
resave:false,
saveUninitialized:false
}))

app.use(flash())

app.set('view engine','ejs')

app.use(layouts)

app.set('layout','layouts/main')

app.use(express.static('public'))

app.use(require('./routes/web'))

app.listen(process.env.PORT,()=>{

console.log("ERP funcionando en puerto "+process.env.PORT)

})