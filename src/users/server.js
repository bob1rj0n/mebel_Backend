const {PORT_USER}=require("../../config/config")
const {connectDB}=require("../common/db/connections/connectDB")
const server = require("./modules/index")

connectDB().then(()=>{
    server.listen(PORT_USER, console.log("Server Users connected, Port:"+PORT_USER))
}).catch((e)=>{
    console.log("Xatolik,", e)
})