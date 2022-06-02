const { Schema, default: mongoose } = require("mongoose")

const messageSchema = new Schema(
    {
        name: {
            required: true,
            type: String
        },
        phoneNumber: {
            required: true,
            type: String
        }
    },
    { timestamps: true }
)

const messageModel = mongoose.model("message", messageSchema)

module.exports = { messageModel }