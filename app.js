//const createError = require("https-errors");
const express = require("express");
const path = require("path");
const connection_string = require("./config/mongoString");
const db = require("./db");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());

app.use(cors());

//app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/products", productRoutes);
app.use("/", authRoutes);
app.get("*", function(req, res) {
  res.status(404).json({ error: "Page not found" });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
