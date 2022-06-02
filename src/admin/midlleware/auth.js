const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../../../config/config")
const { userModel } = require("../../common/db/models/user.model")

async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) throw new Error("Royxatdan otish kerak")

        let Name;

        await jwt.verify(token, JWT_KEY, (er, data) => {
            if(er) throw new Error(er.message)
            Name = data
        })

        const foundAdmin = userModel.find({ Name })
        if (!foundAdmin) throw new Error("User topilmadi")

        next();
    }
    catch (e) {
        res.send({
            error: e.message
        })
    }
}

module.exports = { auth }