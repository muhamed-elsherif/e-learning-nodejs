const teacherModel = require("../models/teacher.model")
const subjectModel = require("../models/subject.model")
const {resApi} = require("../helpers/helpers")

class Teacher {
    static add = async(req,res)=>{
       try{
        const teacher = new teacherModel(req.body)
        await teacher.save()
        resApi(res,true,teacher,"teacher add")
       }
       catch(e){
        resApi(res,false,e,e.message)
       }
    }

    static login = async(req,res)=>{
        try{
            const teacher = await teacherModel.login(req.body.username, req.body.password)
            const token = await teacher.newToken()
            resApi(res,true,{teacher,token},"logged in")
        }     
        catch(e){
            resApi(res,false,e,e.message)
        }
    } 
    static logout = async(req,res)=>{
        try{}
        catch(e){}
    }
    static edit = async(req,res)=>{
        try{

            const teacher = await teacherModel.findByIdAndUpdate(req.params.id,req.body,{runValidators:true})
            resApi(res,true,teacher,"edited")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }
    static delAccount = async(req,res)=>{
        try{
            const teacher = await teacherModel.findByIdAndDelete(req.params.id)
            if(!teacher) throw new Error('Teacher already delted')
            resApi(res,true,teacher,"teacher deleted")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }

    static addSubject = async(req,res)=>{
        try{
            const subject = new subjectModel({...req.body , teacherID :req.teacher._id})
            await subject.save()
            resApi(res,true,subject,"subject added")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }

    static delSubject = async(req,res)=>{
        try{
            const subject = await subjectModel.findByIdAndDelete(req.params.id)
            resApi(res,true,subject,"subject deleted")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }
    static editSubject = async(req,res)=>{
        try{
            const subject = await subjectModel.findByIdAndUpdate(req.params.id,req.body,{runValidators:true})
            resApi(res,true,subject,"subject edited")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }
}

module.exports = Teacher