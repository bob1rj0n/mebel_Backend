const { postModel } = require("../../../common/db/models/post.model")
const { photoModel } = require("../../../common/db/models/photo.model")
const { companyModel } = require("../../../common/db/models/company.model")

module.exports = {
    POST: async (req, res) => {
        try {
            const postId = req.params.id;
            const photo = req.file;
            let response = await photoModel.create({ name: photo.originalname, path: photo.path })
            await postModel.updateOne({ _id: postId }, { $set: { photoId: response._id } })

            res.send({
                Photo: response
            })

        } catch (e) {
            res.send({
                error: e.message
            })
        }
    },
    COMPANY: async (req, res) => {
        try {
            const companyId = req.params.id;
            const photo = req.file;
            let response = await photoModel.create({ name: photo.originalname, path: photo.path })

            const company = await companyModel.updateOne({ _id: companyId }, { $set: { photoId: response._id } })

            res.send({
                COMPANY: company
            })
        } catch (error) {
            res.send({
                error: error.message
            })
        }
    }
}