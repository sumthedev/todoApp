const express = require("express");
const noteModels = require("../models/yourNote");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  const newNote = new noteModels({
    title: title,
    description: description,
    userID: req.userID,
  });

  try {
    await newNote.save();
    res.status(400).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json("message: Something went wrong.");
  }
};

const getNote = async (req, res) => {
  try {
    const note = await noteModels.find({ userId: req.userId });
    res.status(400).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json("message: Something went wrong.");
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const newNote = {
    title: title,
    description: description,
    userId: req.userId,
  };

  try {
    await noteModels.findByIdAndUpdate(id, newNote, { new: true });
    res.status(400).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json("message: Something went wrong.");
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteNote = await noteModels.findByIdAndRemove(id);
    res.status(202).json(deleteNote);
  } catch (error) {
    console.log(error);
    res.status(500).json("message: Something went wrong.");
  }
};

module.exports = { getNote, createNote, updateNote, deleteNote };
