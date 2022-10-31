const mongoose  = require("mongoose")
const validator = require("validator")
const bcrypt    = require("bcryptjs")
const jwt       = require("jsonwebtoken")

const teacherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlenth:10
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        validate:function(value){
            if(!validator.isEmail(value)) throw new Error("Invalid Email")
        }
    },
    age:{
        type:Number,
        trim:true,
        required:true,
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        minlength:9,
        maxlenth:30,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:9,
        maxlenth:30,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    image:{
        type:String,
        trim:true,
        default:app.webp
    }
})

teacherSchema.pre("save",async function(){
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password,12)
} )

teacherSchema.methods.newToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id},process.env.JWT)
    user.tokens.push({token})
    await user.save()
    return token
}

teacherSchema.statics.login = async (username,password)=>{
    const user = await Teacher.findOne({username})
    if(!user) throw new Error("invalid username")
    const passCheck = bcrypt.compare(user.password,password)
    if(!passCheck) throw new Error("invalid password")
    return user
}


const Teacher = mongoose.model("Teachers",teacherSchema)

module.exports = Teacher