const { Router } = require("express");
const Product = require("../models/Product.model");
const { verifyToken } = require("../utils/helper");
const productRouter = Router();
const { storage } = require("../utils/multerImages");
const multer = require("multer");

const uploadImages = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

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
productRouter.post(
  "",
  uploadImages.single("productImage"),
  async (req, res) => {
    const {
      name,
      description,
      published,
      price,
      rating,
      type,
      userId,
      typOfProduct,
      brandCategory,
      otherDetails,
    } = req.body;
    const checkProduct = await Product.findOne({ name });

    const imagePath = "/uploads/" + req.file.filename;

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
          typOfProduct,
          brandCategory,
          otherDetails,
          createdBy: userId,
          productImage: imagePath,
        });
        return res.send({
          status: 200,
          msg: "Successfully created new product",
        });
      }
    }
  }
);

/**
 * to update product based on the id
 */
productRouter.patch(
  "/:id",
  uploadImages.single("productImage"),
  async (req, res) => {
    const { id: _id } = req.params;
    const {
      name,
      description,
      published,
      price,
      typOfProduct,
      rating,
      createdBy,
      otherDetails,
      brandCategory,
    } = req.body;
    const findProduct = await Product.findOne({ _id });
    const imagePath = "/uploads/" + req.file.filename;

    if (findProduct) {
      const updatedProduct = {
        name,
        description,
        published,
        price,
        rating,
        typOfProduct,
        brandCategory,
        otherDetails,
        createdBy,
        productImage: imagePath,
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
  }
);

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
  const { published, name } = req.params;
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

/**
 * To publish product
 */
productRouter.post("/publish", async (req, res) => {
  const { published, id } = req.body;

  const findProduct = await Product.findOne({ _id: id });

  if (findProduct) {
    await Product.findOneAndUpdate({ _id: id }, { $set: { published } });
    return res.status(200).send({
      msg: "Successfully updated product status",
    });
  } else {
    return res.status(400), send({ msg: "Product not found" });
  }
});

module.exports = productRouter;
