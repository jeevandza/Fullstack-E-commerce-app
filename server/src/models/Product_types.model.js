const  { Schema, mongoose } = require("mongoose");

const ProductTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  updatedBy: {
    type: String,
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
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
  mongoose.models.product_types ||
  mongoose.model("product_types", ProductTypeSchema);

module.exports = ProductTypes;
