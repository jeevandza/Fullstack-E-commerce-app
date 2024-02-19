const mongoose = require("mongoose");


const RoleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

const Role = mongoose.models.role || mongoose.model("role", RoleSchema);

module.exports =  Role;
