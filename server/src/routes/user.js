const { Router } = require("express");
const User = require("../models/User.model");
const Role = require("../models/Role.model");
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
  const { name, email, role, createdBy } = req.body;

  const creatorRole = await Role.findOne({ _id: role});

  if (creatorRole.roleType !== "admin")
    return res.status(400).send({ msg: "Only admins can add users" });

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).send({ msg: "User already exists" });
  } else {
    const newUser = await User.create({
      name,
      email,
      role,
      createdBy,
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
  const { name, email, isFirstTime, role, updatedBy } = req.body;

  const findUser = await User.findOne({ _id });

  if (findUser) {
    const updateUser = {
      name,
      email,
      isFirstTime,
      role,
    };
    await User.updateOne(
      { _id },
      {
        $set: updateUser,
        updatedAt: new Date(),
        updatedBy: updatedBy ? updatedBy : User.updatedBy,
      }
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
