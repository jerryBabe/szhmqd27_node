const express = require('express')

const path = require('path')

//创建路由对象
const accountRouter = express.Router()

const accountController = require(path.join(__dirname,'../controllers/accountController.js'))

//MVC
accountRouter.get('/register',accountController.getRegisterPage)