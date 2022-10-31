const router  = require("express").Router()
const Subject = require("../controllers/subject.controller")
// 

router.get("/showOne/:id",Subject.showOne)
router.get("/showAll",Subject.showAll)



module.exports = router