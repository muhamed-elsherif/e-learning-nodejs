const router = require("express").Router()
const Teacher = require("../controllers/teacher.controller")
const Auth = require("../middlewares/auth")

router.post("/addTeacher",Teacher.add)
router.post("/login",Teacher.login)
router.post("/edit/:id",Auth.teacherAuth,Teacher.edit)

router.post("/addSubject",Auth.teacherAuth,Teacher.addSubject)
router.post("/editSubject/:id",Auth.teacherAuth,Teacher.editSubject)
router.post("/delSubject/:id",Auth.teacherAuth,Teacher.delSubject)


router.get("/del/:id", Teacher.delAccount)
module.exports = router