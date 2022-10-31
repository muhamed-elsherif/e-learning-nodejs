const subjectModel = require("../models/subject.model")
const {resApi} = require("../helpers/helpers")

class Subject {
    static addSubject =async (req,res)=>{
        const subject = new subjectModel(req.body)
        await subject.save()
        resApi(res,true,subject,"subject added")
    }
    static showOne = async (req,res)=>{
        try{
            const subject = await subjectModel.findOne({_id:req.params.id})
            resApi(res,true,subject,"single subject")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }
    static showAll = async (req,res) =>{
        try{
            const allSubjects = await subjectModel.find()
            resApi(res,true,allSubjects,"all subjects")
        }
        catch(e){
            resApi(res,false,e,e.message)
        }
    }
}

module.exports = Subject