const { Router } = require("express");
const Product = require("../models/Product.model");
const { verifyToken } = require("../utils/helper");
const productRouter = Router();

/**
 * To get all the product list
 */

productRouter.get("", async (req, res, next) => {
  // verifyToken(req, res, next)
  const productList = await Product.find();
  if (productList) {
    return res.send({
      status: 200,
      msg: "Product List",
      data: productList,
    });
  } else {
    return res.send({
      status: 400,
      msg: "No list found",
    });
  }
});

/**
 * To get product based on product id
 */
productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const findProduct = await Product.findOne({ _id: id });
  if (findProduct) {
    return res.send({
      status: 200,
      msg: "Product found",
      data: findProduct,
    });
  } else {
    return res.send({
      status: 400,
      msg: "No matching product found",
    });
  }
});

/**
 * To create a product
 */
productRouter.post("", async (req, res) => {
  const { name, description, published, price, rating, type, userId } =
    req.body;
  const checkProduct = await Product.findOne({ name });
  if (checkProduct) {
    return res.send({
      status: 500,
      msg: "Product is already exists",
    });
  } else {
    if (!name || !description || !price) {
      res.send({
        status: 400,
        msg: "Name, description and price are required",
      });
    } else {
      await Product.create({
        name,
        description,
        published,
        price,
        rating,
        type,
        createdBy: userId,
      });
      return res.send({
        status: 200,
        msg: "Successfully created new product",
      });
    }
  }
});

/**
 * to update product based on the id
 */
productRouter.patch("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { name, description, published, price, type, rating, userId } =
    req.body;
  const findProduct = await Product.findOne({ _id });
  if (findProduct) {
    const updatedProduct = {
      name,
      description,
      published,
      price,
      type,
      rating,
    };
    await Product.updateOne(
      { _id },
      { $set: updatedProduct, updatedAt: new Date(), updatedBy: userId }
    );
    return res.send({
      status: 200,
      msg: "Product updated successfully",
      data: { ...updatedProduct },
    });
  } else {
    return res.send({
      status: 400,
      msg: "Invalid product",
    });
  }
});

/**
 * To remove a product based on its id
 */
productRouter.delete("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const findProduct = await Product.find({ _id });
  console.log(findProduct, "fo");
  if (findProduct) {
    Product.deleteOne({ id });
    return res.send({
      status: 200,
      msg: "Removed product from list",
    });
  } else {
    return res.send({
      status: 400,
      msg: "Something went wrong",
    });
  }
});

/**
 * To remove entire product collection
 */
productRouter.delete("/list", (req, res) => {
  Product.deleteMany();
  return res.send({
    status: 200,
    msg: "Removed all list from collection",
  });
});

/**
 * To get the list based on query params
 */
productRouter.get("", async (req, res) => {
  const { published, name } = req.query;
  console.log(published, name, "name");
  const findProduct = await Product.find({ $or: [{ published, name }] });
  if (findProduct) {
    return res.send({
      status: 200,
      data: findProduct,
    });
  } else {
    return res.send({
      status: 400,
      msg: "Product not found",
    });
  }
});

module.exports = productRouter;
