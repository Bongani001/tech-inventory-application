const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  inStock: Number,
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/${this.category}/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
