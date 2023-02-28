const express = require("express");
const userRouter = require("./routes/userRouters");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const yourNoteRouter = require("./routes/yourNotes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.use(cors());

// In this method, you get an idea about request from where the request are coming for
app.use((req, res, next) => {
  console.log("HTTP" + " " + req.method + " ," + req.url);
  next();
});

app.use("/user", userRouter);
app.use("/note", yourNoteRouter);

app.get("/", (req, res) => {
  res.send("Save your notes");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is listening on port" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Project Credit: Sumbal Hashmi,
//I'm happy, if this project helps you
