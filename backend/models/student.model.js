const mongoose  = require("mongoose")
const validator = require("validator")
const bcrypt    = require("bcryptjs")
const jwt       = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlenth:10,
    },
    username :{
        type:String,
        require:true,
        unique:true,
        trim:true,
        minlength:6,

    },
    email : {
        type:String,
        trim:true,
        unique:true,
        validate:function(value){
            if(!validator.isEmail(value)) throw new Error("Invalid Email")
        }
    },
    age : {
        type:Number,
        trim:true,
        min:12,
        max:25
    },
    class : {},
    password : {
        type:String,
        trim:true,
        required:true,
        minlength:9,
        maxlenth:30,

    },
    profileImage : {
        type:String,
        trim:true,
        default:app.webp
    },
    tokens : [{
        token:{
            type:String,
            required:true
        }
    }]

},{timestamps:true})


userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.__v
    // delete userData.tokens
    // delete userData.password
    return userData
}

userSchema.pre("save",async function(){
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password,12)
} )
userSchema.statics.login = async (username,password)=>{
    const user = await userModel.findOne({username})
    if(!user) throw new Error("invalid username")
    const passCheck = bcrypt.compare(user.password,password)
    if(!passCheck) throw new Error("invalid password")
    return user
}

userSchema.methods.newToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id},process.env.JWT)
    user.tokens.push({token})
    await user.save()
    return token
}

const userModel = mongoose.model("Users",userSchema)

module.exports  = userModel