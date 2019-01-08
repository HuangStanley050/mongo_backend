var express = require("express");
var router = express.Router();
const productController = require("../controllers/products");

router
  .get("/", productController.getProducts)
  .post("/", productController.addProduct);

module.exports = router;
