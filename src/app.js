//导包
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var session = require('express-session')

//创建app
const app = express()

app.use(bodyParser.urlencode({extended:false})) 

app.use(bodyParser.json())

// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave:false, cookie: { maxAge: 600000 }}))

//设置静态资源根目录
app.use(express.static(path.join(__dirname,'public')))

//导入路由对象,路由中间件写在最后 
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log("start ok")
})