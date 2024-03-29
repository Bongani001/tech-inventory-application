const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true}
})

CategorySchema.virtual("url").get(function() {
    return `/categories/${this._id}`
})

module.exports = mongoose.model("Category", CategorySchema)