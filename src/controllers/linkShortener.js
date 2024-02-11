import rebrand from "../utils/Rebrandly.js"
import userSchema from "../database/formSchema.js"

const createLink=async(req,res)=>{
    try {
        
        let sample=await userSchema.findOne({email:req.params.name})
        let result = await rebrand.createLink(req.body.url);
        if(result){

        
               sample.shortLinks.push({link:result.short_url,name:req.body.ShortenLinkName}); 
               await sample.save();
                // console.log( sample.shortLinks.push(result.short_url))
            res.status(200).send({
              result:result

            })
        }
        else{
            res.status(500).send({
                message:"Please provide correct Url ",
                
            })
        }

        // sample.shortLinks.push()
    } catch (error) {
        res.status(500).send({
            message:"internal server error",
            link:"please enter proper Link",
            error:error
        })
    }

    
    
}

const getAllLink=async(req,res)=>{
    try {
        
        let sample=await userSchema.findOne({email:req.params.name})

        if(sample){
               let datas=sample.shortLinks
               console.log(datas)
                // console.log( sample.shortLinks.push(result.short_url))
            res.status(200).send({
              result:datas

            })
        }
        else{
            res.status(500).send({
                message:"Wrong mail Id ",
                
            })
        }

        // sample.shortLinks.push()
    } catch (error) {
        res.status(500).send({
            message:"internal server error",
            
            error:error
        })
    }

    
    
}
export default {createLink,getAllLink}



