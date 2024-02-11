
import userSchema from "../database/formSchema.js"
import hasher from "../hashing/hasher.js"
import emailService from "../utils/emailService.js"

const addUser=async(req,res)=>{
    try {
        try {
            const user = await userSchema.findOne({email:req.body.email})
            if(!user){
                req.body.password = await hasher.createHash(req.body.password)

                let newUser = await userSchema.create(req.body)
                let id=newUser._id.valueOf()
                let sendEmail=await emailService.sendActivateEmail(id,newUser.email)
                res.status(200).send({
                    message:"User Added Successfully",
                    checkMail:"Activate Link sent to your Email"
                    
                })
            }
            else{
                res.status(400).send({
                    message:`User with ${req.body.email} already exists`
                })
            }
        } catch (error) {
            res.status(500).send({
                message:"Internal Server Error",
                error:error.message
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const checkUser=async(req,res)=>{
    let {email,password}=req.body
    try {
        let data=await userSchema.findOne({email:email})
        if(data){
            if(await hasher.hashCompare(password,data.password) ){
                    if(data.activateStatus){
                        res.status(200).send(
                            {
                                message:"Ok user found",
                                notValid:"true",
                                checks:"found",
                                email:data.email,
                             
                            }
                        )
                    }
                    else{
                        res.status(400).send(
                            {
                                message:"Completed two step authentication first Check the mail ",
                                notValid:"false",
                                checks:"activate"
                            }
                        )
                    }
            }
            else{
                res.status(400).send({
                    message:`Incorrect Password`,
                    notValid:"false",
                    checks:"incorrectpassword"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`,
                notValid:false,
                checks:"mailAlready"
            })
        }

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
        
    }

}
const authenticateUser=async(req,res)=>{
    let id=req.params.id
    console.log(id);
    try {
        let data=await userSchema.findOne({_id:id})
        if(data){
            data.activateStatus=true;
        data.save()
        res.status(200).send({
            message:"Url Shortner Welcomes You",
            data:data.name
        })
        }
        else{
            res.status(400).send({
                message:"Please click from the mail"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server error",
            error:error.message
        })
    }
}

const resetPassword=async(req,res)=>{
    let {email}=req.body
    try {
        let data=await userSchema.findOne({email:email})
        if(data){
            const token = await hasher.createToken({
                name:data.name,
                email:data.email,
            })
            data.passwordReset=token
            await data.save()
            let sendEmail=await emailService.resetMail(token,email)
            res.status(200).send({
                message:"Password sent to mail"
            })
        }
        else
        {
            res.status(400).send({
                message:`Enter Valid mail   `,
                checks:"Enter Valid Mail"
            })
        }

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",

            error:error.message
        })
        
    }

}

const checkResetPass=async(req,res)=>{
    let {token,email}=req.params
    try {
        let data=await userSchema.findOne({passwordReset:token})
        if(data){
            data.passwordReset=""
            await data.save()
            res.status(200).send({
                message:true
            })
        }
        else{
            res.status(400).send({
                message:"Your are not allowed"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
        
    }
}
const UpdatePass=async(req,res)=>{
    let {email}=req.params
    let {password}=req.body
 
    try {
        let data=await userSchema.findOne({email:email})
        if(data){
            password = await hasher.createHash(password)
            data.password=password;
            await data.save()
            res.status(200).send({
                message:"Done"
            })
        }
        else{
            res.status(400).send({
                message:"Your are not allowed"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
        
    }
}

export default{addUser,checkUser,authenticateUser,resetPassword,checkResetPass,UpdatePass}