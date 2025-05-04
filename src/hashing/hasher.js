
import bcrypt from 'bcrypt'
const SALT = 10


import jwt, { decode } from 'jsonwebtoken'//authorization for password reset


const createHash = async(data)=>{
    let salt = await bcrypt.genSalt(SALT) // For Changin normal text to random string
    let hash = await bcrypt.hash(data,salt) // For Encrypting the text
    return hash
}


const createToken = async(payload)=>{
    let token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
    return token
}
const decodeToken = async(token)=>{
    return await jwt.decode(token)
}
const hashCompare = async(data,hash)=>{
    return await bcrypt.compare(data,hash)
}


const adminGuard = async(req,res,next)=>{
    let token = req?.headers?.authorization?.split(" ")[1]
    
    if(token)
    {
        let payload = await decodeToken(token)
        if(payload.resetStatus)
        {
            next()
        }
        else{
            res.status(402).send({
                message:"Only Admins are allowed"
            })
        }
    }
    else
    {
        res.status(402).send({
            message:"Unauthorised access"
        })
    }
    
}


const authenticate = async(req,res,next)=>{
    let token = req?.headers?.authorization?.split(" ")[1]

    if(token)
    {
        let payload = await decodeToken(token)
        let currentTime = +new Date()
   
        if(Math.floor(currentTime/1000)<payload.exp)
        {
            next()
        }
        else{
            res.status(402).send({
                message:"Session Expired"
            })
        }
    }
    else
    {
        res.status(402).send({
            message:"Unauthorised access"
        })
    }
    
}



export default {
    createHash,
    createToken,
    authenticate,
    decodeToken,
    adminGuard,
    hashCompare
}