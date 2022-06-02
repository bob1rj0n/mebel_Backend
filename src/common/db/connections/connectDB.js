const mongoose = require("mongoose")

async function connectDB() {
    const connection = await mongoose.connect(
        "mongodb://localhost:27017/mebel"
    )
    // mongoose.set("debug", true)
    return connection
}

module.exports = { connectDB }