const { Router } = require("express");
const User = require("../models/User.model");

const profileRouter = Router();

profileRouter.get("/:id", async (req, res) => {
  const { id: _id } = req.body;

  const findUser = await User.findOne({ _id });
  if (findUser) {
    res.status(200).send({
      msg: "User fetched successfully",
      data: await findUser,
    });
  } else res.status(400).send("User not found");
});


module.exports = profileRouter
