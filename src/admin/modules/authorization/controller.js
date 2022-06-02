const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../../../../config/config")
const { userModel } = require("../../../common/db/models/user.model")

module.exports = {
    SIGN_IN: async (req, res) => {
        try {
            const { userName } = req.body;
            const foundUser = await userModel.findOne({ userName: userName }, {_id: 1})

            if (!foundUser) throw new Error("Bunday user topilmadi")

            const newToken = jwt.sign({ userName }, JWT_KEY)

            res.send({
                userId: foundUser._id,
                Token: newToken
            })
        }
        catch (e) {
            res.send({
                error: e.message
            })
        }
    },
    LOG_IN: async (req, res) => {
        try {
            const { userName, password } = req.body;
            const foundUser = await userModel.findOne({ userName: userName })

            if (foundUser) throw new Error("Bunday user oldindan mavjud")

            const creatUser = await userModel.insertMany([{ userName: userName, password: password }])

            const token = jwt.sign({ userName }, JWT_KEY)

            res.send({
                newUser: creatUser,
                Token: token
            })
        }
        catch (e) {
            res.send({
                error: e.message
            })
        }
    }
}