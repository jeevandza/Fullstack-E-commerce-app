const { Schema, mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
let Joi = require("joi");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "role",
  },
  isFirstTime: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: "Active",
  },
  createdBy: {
    id: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});


const User = mongoose.models.users || mongoose.model("users", UserSchema);
// User.plugin(mongoosePaginate);
// User.paginate({}, options, function(err,result){});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.types.String().min(4).max(30).require(),
    password: Joi.types
      .String()
      .min(8)
      .max(30)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    email: Joi.types.String().email().required(),
  });
  return schema.validate(User)
};

module.exports = {User, validateUser};
