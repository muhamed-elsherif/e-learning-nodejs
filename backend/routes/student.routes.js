const router  = require("express").Router()
const Student = require("../controllers/student.controller")
const Auth    = require("../middlewares/auth")


router.post("/add",Student.register)
router.post("/login", Student.login)
router.post("/logout",Auth.stdAuth,Student.logout)
router.post("/joinSubject/:id",Auth.stdAuth,Student.joinSubject)
router.post("/leaveSubject/:id",Auth.stdAuth,Student.leaveSubject)

// router.get("/delAccount/:id",Auth.stdAuth,Student.delAccount)


module.exports = router