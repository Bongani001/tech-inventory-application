const mongoose = require("mongoose");
const Category = require("./category");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  inStock: Number,
});

module.exports = mongoose.model("Item", ItemSchema);
