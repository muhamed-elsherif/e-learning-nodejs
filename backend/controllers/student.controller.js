const studentModel = require("../models/student.model")
const subjectModel = require("../models/subject.model")

const {resApi} = require("../helpers/helpers")
// const userModel = require("../models/user.model")

class Student {
   static register = async (req,res)=>{
    try{
        const student = new studentModel(req.body)
        student.userType = "student"
        await student.save()
        resApi(res,true,student,"student added")
    }
    catch(e){
        resApi(res,false,e,e.message)
    }
   }

   static login = async(req,res)=>{
    try{
        const student = await studentModel.login(req.body.username, req.body.password)
        const token = await student.newToken()
        resApi(res,true,{student,token},"logged in")
    }
    catch(e){
        resApi(res,false,e,e.message)
    }
   }

   static logout = async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(t=> t.token != req.token)
        await req.user.save()
        resApi(res,true,req.user,"logged out")
    }
    catch(e){
        resApi(res,false,e,e.message)
    }

   }
   static delAccount = async (req,res)=>{
    try{
        const std = studentModel.findByIdAndDelete(req.params.id)
        
        resApi(res,true,std,"account deleted")
    }
    catch(e){
        resApi(res,false,e,e.message)
    }
   }

   static joinSubject =async (req,res)=>{
    try{
        const subject = await subjectModel.findById(req.params.id)
        const studentID = req.user._id
        // console.log(studentID)
        if(!subject) throw new Error("subject not found")
        // if()
        subject.students.push({studentID})
        await subject.save()
        resApi(res,true,subject,"you joined subject")

    }
    catch(e){
        resApi(res,false,e,e.message)
    }
   }
   static leaveSubject =async (req,res)=>{
    try{
        const subject = await subjectModel.findById(req.params.id)
        const studentID = req.user._id
        // console.log(studentID)
        if(!subject) throw new Error("subject not found")
        // if()
        subject.students.remove({studentID})
        await subject.save()
        resApi(res,true,subject,"you joined subject")

    }
    catch(e){
        resApi(res,false,e,e.message)
    }
   }
}

module.exports = Student

