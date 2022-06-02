const router = require("express").Router();
const { GET, POST, DELETE, GET_BY_PAGING, SEARCH, COMPANY, ABOUT_COMPANY, ADDRESS, PUT, GET_MESSAGES } = require("./controller")
const { auth } = require("../../midlleware/auth")

router.get("/", GET)
router.get("/post", GET_BY_PAGING)
router.get("/posts/search", SEARCH)
router.get("/about", ABOUT_COMPANY)
router.get("/message", GET_MESSAGES)

router.post("/newPost/:id", auth, POST)
router.post("/company",auth, COMPANY)
router.post("/addres",auth, ADDRESS)
router.put("/update/:id",auth, PUT)
router.delete("/post/:id", auth, DELETE)

module.exports = router;