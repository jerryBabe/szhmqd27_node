const path = require('path');
const basetool = require(path.join(__dirname,'../tools/basetool.js'))
const captchapng = require('captchapng')


//获取注册页面
exports.getRegisterPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

/**
 * 导出的注册方法
 */
exports.register = (req,res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }
    //1.拿到浏览器传输过来的数据
    const {username} = req.body
basetool.findYige('accountInfo', {username}, (err,doc) =>{
     //如果result == null 没有查询到，就可以插入，如果查询到了说明用户已经存在
     if (doc){
        //存在
        result.status = 1;
        result.message = "用户名已经存在"

        //返回
        res.json(result);
    }else {
        //如果用户名不存在，插入到数据库中
        //resul2有值，代表成功，result2为null就是失败
        basetool.insertSingle('accountInfo',req.body, (err,result2) => {
            if (!result2) {
                //失败
                result.status = 2;
                result.message = "注册失败";
            }

            //返回
            res.json(result);

        })
    }
})
}

//导出获取登录页面的方法
exports.getLoginPage = (req,res ) =>{
    res.sendFile(path.join(__dirname,"../public/views/login.html"))
}

exports.getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    // 把vcode保存到session对象中去，方便将来登录
    req.session.vcode = vcode
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
  
    var img = p.getBase64();
    var imgbase64 = Buffer.form(img, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(imgbase64);
  };

  
  //导出登录的方法
  exports.login = (req,res) => {
      const result = {
          status: 0,
          message: '登陆成功'
      }

      const { username,password,vcode} = req.body
      
      //验证验证码
      if( vcode != req.session.vcode) {
          result.status = 1,
          result.message = '验证码错误'

          res.json(result)
          return
      }

      //验证码正确了
      basetool.findYige('accountInfo',{username,password}, (err,doc) =>{
        if(!doc) {
            result.status = 2
            result.message = '用户名或是密码错误'
        }
        
        res.json(result)
      })
  }