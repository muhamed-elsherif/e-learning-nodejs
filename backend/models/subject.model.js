const mongoose  = require("mongoose")

const subJectSchema = mongoose.Schema({
    teacherID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
    },
    discription:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
    },
    students:[{
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
    }]
},{timestamps:true})
subJectSchema.methods.toJSON = function(){
    const subjectData = this.toObject()
    delete subjectData.__v
    // delete userData.tokens
    // delete userData.password
    return subjectData
}

const Subject = mongoose.model("Subject",subJectSchema)
module.exports = Subject