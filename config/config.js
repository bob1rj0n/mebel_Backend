require("dotenv").config();

const {env} = require("process")

module.exports={
    PORT_ADMIN: env.PORT_ADMIN,
    PORT_USER: env.PORT_USER,
    JWT_KEY: env.JWT_KEY
}