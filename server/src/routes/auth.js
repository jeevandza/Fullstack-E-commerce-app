const { Router } = require("express");
const User = require("../models/User.model");
const { hashPassword, verifyPassword } = require("../utils/helper");
const jwt = require("jsonwebtoken");

const authRouter = Router();

/**
 * To login use based on user-name/email and the password
 */
authRouter.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const findUser = await User.findOne({ $or: [{ name }, { email }] });

  if (findUser) {
    const checkPassword = await verifyPassword(password, findUser.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          id: await findUser._id,
          name: await findUser.name,
        },
        process.env.JWT_SECRET_KET,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );
      return res.send({
        status: 200,
        msg: "Login success",
        data: findUser,
        access_token: token,
      });
    }
    return res.status(400).send({ msg: "Invalid password" });
  } else {
    return res.status(400).send({ msg: "Invalid credentials" });
  }
});

/**
 * Signup user or create new user
 */
authRouter.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  const findUser = await User.findOne({ $or: [{ email }, { name }] });

  if (findUser) {
    return res.send({
      status: 400,
      msg: "User already exists",
    });
  } else {
    const hashUserPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      password: hashUserPassword,
      email,
    });
    newUser.save();
    res.send({
      status: 200,
      msg: "User created successfully",
    });
  }
});

module.exports = authRouter;
