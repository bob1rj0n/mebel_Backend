const { POST } = require("./controller");
const router = require("express").Router()

router.post("/message", POST)

module.exports = router;