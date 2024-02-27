const express = require("express");
const authRouter = require("./routes/auth.js");
const profileRouter = require('./routes/profile.js')
const productRouter = require("./routes/product.js");
const productTypeRouter = require('./routes/productTypes.js')
const roleRouter = require('./routes/role_types.js')
const userRouter = require('./routes/user.js')
require("dotenv").config();
const { connectDatabase } = require("./database/index.js");
const BodyParser = require("body-parser");
const Cors = require("cors");
const jwt = require('jsonwebtoken');
const { verifyToken } = require ("./utils/helper.js");
// const logger = require('./utils/config/logger.js')

connectDatabase();

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT,PATCH, DELETE");
  next();
});

/**
 * Check for access token in headers skip for login and signup routes
 */
app.use((req, res, next)=>{
  if(req.path !== "/v1/auth/login" && req.path !== '/v1/auth/signup'){
    verifyToken(req, res, next)
  }else{
    next()
  }
})

app.use("/v1/auth", authRouter);
app.use("/v1/profile", profileRouter);
app.use("/v1/product/list", productRouter);
app.use("/v1/product_types", productTypeRouter);
app.use("/v1/role", roleRouter);
app.use("/v1/users", userRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
