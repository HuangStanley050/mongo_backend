const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("this is auth");
});

router.post("/login", authController.login);

module.exports = router;
