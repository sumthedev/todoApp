const express = require("express");
const { signup, signin } = require("../controller/userController");

const userRouter = express.Router(); // express.Router is used to create the another route

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);
module.exports = userRouter;
