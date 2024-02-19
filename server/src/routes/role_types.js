const { Router } = require("express");
const Role = require("../models/role.model");

const roleRouter = Router();

roleRouter.post("", async (req, res) => {
  const { name, type, userId } = req.body;

  const findRole = await Role.findOne({ $and: [{ name, type }] });

  if (findRole) res.status(400).send({ msg: "Role already exists" });
  else {
    const createRole = await Role.create({
      roleName:name,
      roleType:type,
      createdBy: userId,
    });
    createRole.save();
    return res.status(200).send({ msg: "Role created successfully" });
  }
});

roleRouter.get("", async (req, res) => {
  const fetchRoles = await Role.find();
  if (fetchRoles) {
    return res.status(200).send({ msg: "Role list", data: fetchRoles });
  } else {
    return res.status(400).send({ msg: "Not found" });
  }
});


module.exports = roleRouter



