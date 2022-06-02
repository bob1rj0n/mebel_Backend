const { postModel } = require("../../../common/db/models/post.model")
const { addresModel } = require("../../../common/db/models/addres.model")
const { companyModel } = require("../../../common/db/models/company.model")

module.exports = {
    GET: async (req, res) => {
        const posts = await postModel.find();
        const total = await postModel.countDocuments()

        res.send({
            Total: total,
            Posts: posts
        })
    },

    SEARCH: async (req, res) => {
        try {
            const search = req.query.text;
            let query = {};
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
            const result = await postModel.find(query)
            const total = await postModel.countDocuments(query)
            res.send({
                Total: total,
                Result: result
            })
        } catch (e) {
            res.send({
                error: e.message
            })
        }
    },

    GET_BY_PAGING: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const posts = await postModel.find().skip(limit * (page - 1)).limit(limit).sort({ title: 1 })
            const total = await postModel.countDocuments()

            const address = await addresModel.find(
                {},
                { _id: 0, __v: 0 }
            )

            const aboutCompany = await companyModel.aggregate([
                {$lookup: {from: "photos", localField: "photoId", foreignField: "_id", as: "Photo"}},
                {$project: {_id: 0, photoId: 0}}
            ])

            res.send({
                Total: total,
                About_Company: aboutCompany,
                Post: posts,
                ADDRESS: address
            })

        } catch (e) {
            res.send({
                error: e.message
            })
        }
    }
}