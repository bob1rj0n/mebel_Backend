const axios = require("axios")////ornatish kerak
const { messageModel } = require("../../../common/db/models/message.model")

module.exports = {
    POST: async (req, res) => {
        try {
            const { name, phoneNumber } = req.body;

            const newUser = await messageModel.create({ name: name, phoneNumber: phoneNumber })

            const text = `
                Sizda yangi xabar bor.
            Name: ${name},
            PhoneNumber: ${phoneNumber}
            `

            const token = "5437425843:AAF1_Y2_qf7_y56g33NJYk5c2utKL77WeBE"
            const chatId = 651985244;
            const msg = text

            let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`

            await axios.get(url)

            res.status(200).send("Xabar yuborildi")
        }
        catch (e) {
            res.send({
                error: e.message
            })
        }
    }
}