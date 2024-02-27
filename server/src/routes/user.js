const { Router } = require("express");
const User = require("../models/User.model");
const { hashPassword } = require("../utils/helper");

const userRouter = Router();

/**
 * To get the list of users
 */
userRouter.get("", async (req, res) => {
  const fetchUser = await User.find();

  if (fetchUser) {
    return res.status(200).send({ msg: "User list", data: fetchUser });
  } else {
    return res.status(400).send({ msg: "No list found" });
  }
});

/**
 * To get the user data based on the user id
 */
userRouter.get("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const fetchUser = await User.findOne({ _id });

  if (fetchUser) {
    return res.status(200).send({ msg: "User data", data: fetchUser });
  } else {
    return res.status(400).send({ msg: "No user found" });
  }
});

/**
 * To create user post method
 */
userRouter.post("", async (req, res) => {
  const { name, email, roleId, userId } = req.body;

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).send({ msg: "User already exists" });
  } else {
    const newUser = await User.create({
      name,
      email,
      role: roleId,
      password: "12345",
      createdBy: userId,
    });
    newUser.save();
    return res.status(200).send({ msg: "User created successfully" });
  }
});

/**
 * To update specific user based on the id of the user
 */
userRouter.patch("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { name, email, password, isFirstTime, userId } = req.body;

  const findUser = await User.findOne({ _id });

  if (findUser) {
    const updateUser = {
      name,
      email,
      isFirstTime,
      password: await hashPassword(password),
      userId: !_id ? userId : userId,
    };
    await User.updateOne(
      { _id },
      { $set: updateUser, updatedAt: new Date(), updatedBy: userId }
    );
    return res.status(200).send({ msg: "User updated successfully" });
  } else {
    res.status(400).send({ msg: "Invalid credentials" });
  }
});

/**
 * To delete user from the database(hard delete)
 */
userRouter.delete("/delete/:id", async (req, res) => {
  const { id: _id } = req.params;

  const deleteUser = await User.deleteOne({ _id });
  if (deleteUser) {
    res.status(200).send({ msg: "User deleted successfully" });
  } else {
    res.status(400).send({ msg: "Something went wring" });
  }
});

module.exports = userRouter;
