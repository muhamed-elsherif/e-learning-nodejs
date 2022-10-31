const userModel = require("../models/student.model")
const teacherModel = require("../models/teacher.model")
const jwt       = require("jsonwebtoken")
const {resApi}  = require("../helpers/helpers")


class Auth {
    static stdAuth = async (req,res,next)=>{
        try{
            const token  = req.header("Authorization")
            const decode = jwt.verify(token,process.env.JWT)
           
            
            const stdData = await userModel.findOne({
                _id:decode._id,
                "tokens.token":token
            })

            if(!stdData) throw new Error("Unauthorized")
            req.user  = stdData
            req.token = token
            next()
         }
         catch(e){
            resApi(res,false,e,e.message)
         }
    }
    static teacherAuth = async (req,res,next)=>{
        try{
            const token  = req.header("Authorization")
            const decode = jwt.verify(token,process.env.JWT)
           
            
            const teacherData = await teacherModel.findOne({
                _id:decode._id,
                "tokens.token":token
            })

            if(!teacherData) throw new Error("Unauthorized")
            req.teacher  = teacherData
            req.token = token
            next()
         }
         catch(e){
            resApi(res,false,e,e.message)
         }
    }
}
module.exports = Auth