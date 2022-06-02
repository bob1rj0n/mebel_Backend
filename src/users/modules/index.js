const express = require("express")
const server = express()

const postRouter = require("./posts/router")
const messageRouter = require("./message/router")


server.use(express.json())
server.use(postRouter)
server.use(messageRouter)


module.exports = server