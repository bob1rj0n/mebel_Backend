const express = require("express")
const server = express();

const postRouter = require("./posts/router")
const tokenRouter = require("./authorization/router")
const photoRouter =require("./uploadPhoto/router")

server.use(express.json())
server.use(postRouter)
server.use(tokenRouter)
server.use(photoRouter)

module.exports = server;