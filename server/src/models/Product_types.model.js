const mongoose = require("mongoose");

const ProductTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const ProductTypes =
  mongoose.models.product_types || mongoose.model("product_types", ProductTypeSchema);

module.exports = ProductTypes;
