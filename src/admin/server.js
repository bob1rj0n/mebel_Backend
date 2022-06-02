const server = require("./modules/index")
const { connectDB } = require("../common/db/connections/connectDB")
const { PORT_ADMIN } = require("../../config/config")


connectDB().then(() => {
    server.listen(PORT_ADMIN, console.log("Server Admin connected, Posrt:" + PORT_ADMIN))
}).catch((e) => {
    console.log("Xatolik", e)
})