//导包
const express = require('express')
const path = require('path')

//创建app
const app = express()

//导入路由对象
const accountRouter = express(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log("start ok")
})