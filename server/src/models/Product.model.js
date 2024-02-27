const { Schema, mongoose } = require("mongoose");

const ProductModel = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  typOfProduct: {
    type: String,
    product_type: [
      {
        type: Schema.Types.ObjectId,
        ref: "product_types",
      },
    ],
    required:true,
  },
  brandCategory:{
    type:String,
    required:true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
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
});

const Product =
  mongoose.models.products || mongoose.model("products", ProductModel);

module.exports = Product;
