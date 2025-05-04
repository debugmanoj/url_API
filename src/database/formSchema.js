import mongoose from "./makeConnections.js";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


const signUp= new mongoose.Schema({
    name:
    {
        type:String,
        required:[true,"Name is required"]
    },
    email:
    {
        type:String,
        required:[true,"Email is required"],
        validate:{
            validator:validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    passwordReset:{
        type:String,
    },
    activateStatus:{
        type:Boolean,
        default:false
    },
    shortLinks:{
        type:Array,
        default: []
    }

},
{
    collection:'user',
    versionKey:false
})

const userSchema=mongoose.model("user",signUp)
export default userSchema