const { Schema, mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "product_types",
    required: true,
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

module.exports = User;
