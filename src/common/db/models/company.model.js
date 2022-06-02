const { Schema, Types, default: mongoose } = require("mongoose");

const companySchema = new Schema(
    {
        name: String,
        body: String,
        photoId: Types.ObjectId
    }
)

const companyModel = mongoose.model("company", companySchema)

module.exports = { companyModel }