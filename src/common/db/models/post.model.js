const { Schema, Types, default: mongoose } = require("mongoose")

const postSchema = new Schema(
    {
        title: String,
        price: String,  ///narx
        photoId: Types.ObjectId,
        userId: Types.ObjectId
    },
    { timestamps: true }
)

const postModel = mongoose.model("posts", postSchema)

module.exports = { postModel }