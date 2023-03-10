//* 给req绑定响应的函数
module.exports = (req, res,next) => {
    req.success = function(data=null){
        res.send({
            code:0,
            msg:'success',
            data
        })
    }
    req.fail = function(msg="error"){
        res.send({
            code:-1,
            msg,
            data:null
        })
    }
    next();
}