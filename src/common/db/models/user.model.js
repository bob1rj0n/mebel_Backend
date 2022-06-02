const { Schema, Types, default: mongoose } = require("mongoose")

const userSchema = new Schema(
    {
        userName: {
            required: true,
            unique: true,
            type: String
        },
        password: {
            type: String
        },
        fullName: String,
        isAdmin: false,
    },
    { timestamps: true }
)

const userModel = mongoose.model("users", userSchema)

// userSchema.index({ userName: 1 }, {
//     unique: true,
//     partialFilterExpression: {
//         isDeleted: {
//             $eq: false,
//             $type: "bool"
//         }
//     }
// })


module.exports = { userModel }