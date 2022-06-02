const { Schema, Types, default: mongoose, mongo } = require("mongoose")

const addresSchema = new Schema(
    {
        addres: String,
        phoneNumber: {
            unique: true,
            type: String
        },
        email: {
            unique: true,
            type: String
        },
        linkInstagram: {
            unique: true,
            type: String
        },
        linkTelegram: {
            unique: true,
            type: String
        },
        linkFacebook: {
            unique: true,
            type: String
        }
    }
)

const addresModel = mongoose.model("address", addresSchema)

module.exports = { addresModel }