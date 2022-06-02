const {  SIGN_IN, LOG_IN } = require("./controller")
const router = require("express").Router()

router.post("/sign", SIGN_IN)
router.post("/login", LOG_IN)

module.exports = router;