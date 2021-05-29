const User = require('../models/User')

module.exports.login = (req,res,next) =>{
    res.send(req.user)
}

module.exports.register = async (req,res,next) =>{
    console.log(req.body)
    const user = new User(req.body)
    try{
        await User.register(user, req.body.password)
        res.send('Usuario registrado exitosamente')
    }catch(err){
        next(err)
    }
}