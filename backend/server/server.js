const express  = require("express")
const path = require("path")
const cors = require("cors")
const hbs  = require("hbs")
const exp = require("constants")


require("dotenv").config()
require("../db/connection")

app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"../static")))
app.use(express.urlencoded({extended:true}))

const studentRoutes = require("../routes/student.routes")
const teacherRoutes = require("../routes/teacher.routes")
const subjectRoutes = require("../routes/subject.routes")

app.use("/api/students",studentRoutes)
app.use("/api/teachers",teacherRoutes)
app.use("/api/subjects",subjectRoutes)





app.all("*",(req,res)=>{
    res.send("Invalid URL")
})


module.exports = app