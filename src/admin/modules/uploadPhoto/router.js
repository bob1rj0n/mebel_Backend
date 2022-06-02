const router=require("express").Router()
const multer =require("multer")
const path = require("path")
const { POST, COMPANY } = require("./controller")


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join("uploads", "images"))
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
}).single("photo")

router.post("/photo/:id",upload, POST)
router.post("/photoCompany/:id",upload, COMPANY)

module.exports = router