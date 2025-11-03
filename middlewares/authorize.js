const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const authorize = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization
    }
    // }else if(req.cookies.Authorization){
    //     token = req.cookies.Authorization
    // }

    try{
        if(!token){
            return res.status(404).json({message: "No token provided"})
        }
        const userToken = token.startsWith("Bearer")? token.split(" ")[1]: token
        const verified = jwt.verify(userToken, secret)
        if(!verified){
           return res.status(401).json({message: "Failed to authorize"})
        }

        req.user = verified
        next()

    }catch(error){
        return req.status(500).json({message: "Server error"})
    }

}

module.exports = authorize