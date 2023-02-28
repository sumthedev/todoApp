const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUser = await user.findOne({ email: email });
    if (isUser) {
      res.status(400).json("User Already Exit :)");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await user.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    const token = await jwt.sign(
      { email: result.email, id: result._id },
      SECRET_KEY
    );

    res.status(200).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = await user.findOne({ email: email });
    if (!isUser) {
      res.status(400).json("User not found");
    }

    const checkPassword = await bcrypt.compare(password, isUser.password);
    if (!checkPassword) {
      res.status(400).json("Invalid credinels");
    }

    const provideToken = await jwt.sign(
      { email: isUser.email, id: isUser._id },
      SECRET_KEY
    );

    res.status(200).json({ user: isUser, token: provideToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
