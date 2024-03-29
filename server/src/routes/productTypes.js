const { Router } = require("express");
const ProductTypes = require("../models/Product_types.model.js");

const productTypeRouter = Router();

/**
 * To create product types 
 */
productTypeRouter.post("", async (req, res) => {
  const { name, id, createdBy } = req.body;
  const findProductType = await ProductTypes.findOne({ name });

  if (findProductType) res.status(400).send("Product type already exists");
  else {
    const newType = await ProductTypes.create({
      name: name,
      createdBy,
    });
    newType.save();
    return res.status(200).send("Created product type successfully");
  }
});

/**
 * To get list of product types 
 */
productTypeRouter.get("", async (req, res) => {
  const findProductType = await ProductTypes.find();

  if (!findProductType) res.status(400).send("No such list exists");
  else {
    return res.status(200).send({
      msg: "Product types fetched successfully",
      data: findProductType,
    });
  }
});

module.exports = productTypeRouter;
