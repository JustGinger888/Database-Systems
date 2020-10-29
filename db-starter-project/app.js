require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const tasterController = require("./controllers/taster");

const { WEB_PORT, MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});



app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/tasters", tasterController.list);
app.get("/tasters/delete/:id", tasterController.delete);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});





