const { postModel } = require("../../../common/db/models/post.model")
const { companyModel } = require("../../../common/db/models/company.model")
const { addresModel } = require("../../../common/db/models/addres.model")
const { messageModel } = require("../../../common/db/models/message.model")

module.exports = {
    GET: async (req, res) => {
        const posts = await postModel
            .aggregate([
                { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "User" } },
                { $project: { userId: 0 } },
            ])
        const total = await postModel.countDocuments();

        res.send({
            Total: total,
            Posts: posts
        })
    },

    GET_MESSAGES: async (req, res) => {
        const messages = await messageModel.find(
            {},
            { _id: 0, __v: 0 }
        )

        const total = await messageModel.countDocuments()

        res.send({
            Total: total,
            Messages: messages
        })
    },

    GET_BY_PAGING: async (req, res) => {
        try {
            const {page, limit} = req.query

            const posts = await postModel
                .find()
                .skip(limit * (page - 1))
                .limit(limit)
                .sort({ title: 1 })

            const total = await postModel.countDocuments()
            res.send({
                Total: total,
                Posts: posts
            })
        } catch (e) {
            res.send({
                status: 500,
                error: e.message
            })
        }
    },

    SEARCH: async (req, res) => {
        try {
            const search = req.query.text;
            let query = {}
            if (search) {
                query.$or = [
                    {
                        title: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        price: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            }

            const foundPost = await postModel.find(query, {
                _id: 1,
                title: 1,
                price: 1
            })
            const total = await postModel.countDocuments(query)
            res.send({
                Total: total,
                Post: foundPost
            })


        } catch (e) {
            res.send({
                error: e.message
            })
        }
    },

    POST: async (req, res) => {
        try {
            const userId = req.params.id;
            const { title, price } = req.body;
            const createdPost = await postModel.create({ title: title, price: price, userId: userId })

            res.send({
                Post: createdPost
            })
        } catch (e) {
            res.send({
                error: e.message
            })
        }
    },

    PUT: async (req, res) => {
        try {
            const { title, price } = req.body;
            const id = req.params.id;
            const post = await postModel.findById(id)
            if (!post) throw new Error("Bunday post mavjud emas")

            if (title) {
                await postModel.updateOne({ _id: id }, { $set: { title: title } })
            }
            if (price) {
                await postModel.updateOne({ _id: id }, { $set: { price: price } })
            }
            if (title && price) {
                await postModel.updateOne({ _id: id }, { $set: { title: title, price: price } })
            }
            const updatePost = await postModel.findById(id)

            res.send({
                Post: updatePost
            })
        } catch (e) {
            res.send({
                error: e.message
            })
        }
    },

    DELETE: async (req, res) => {///
        const _id = req.params.id;
        await postModel.deleteOne({ _id: _id })

        const foundPost = await postModel.find();
        const total = await postModel.countDocuments()

        res.send({
            Total: total,
            Posts: foundPost
        })
    },

    COMPANY: async (req, res) => {
        try {
            const company = req.body;
            const createdCompany = await companyModel.create(company)

            res.send({
                Company: createdCompany
            })
        } catch (error) {
            res.send({
                error: error.message
            })
        }
    },

    ABOUT_COMPANY: async (req, res) => {
        const company = await companyModel
            .aggregate([
                { $lookup: { from: "photos", localField: "photoId", foreignField: "_id", as: "Photo" } },
                { $project: { photoId: 0 } }
            ])

        res.send({
            COMPANY: company
        })
    },

    ADDRESS: async (req, res) => {
        try {
            const addres = req.body;
            const createAdres = await addresModel.create(addres);

            res.send({
                ADDRESS: createAdres
            })
        } catch (error) {
            res.send({
                error: error.message
            })
        }
    }
}
