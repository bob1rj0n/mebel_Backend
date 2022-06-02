const { Schema, Types, default: mongoose } = require("mongoose")

const photoSchema = new Schema(
    {
        name: String,
        path: String
    },
    { timestamps: true }
)

const photoModel = mongoose.model("photos", photoSchema)

module.exports = { photoModel }