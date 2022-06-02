const { GET, GET_BY_PAGING, SEARCH } = require("./controller")

const router=require("express").Router()


router.get("/", GET)
router.get("/post", GET_BY_PAGING)
router.get("/post/search", SEARCH)



module.exports=router;