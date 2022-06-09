const express = require("express");
const router = express.Router();

const productsController = require("../controller/productsController");

router.get("/detail", productsController.detail);
router.get("/cart", productsController.cart);
router.get("/sell", productsController.sell);
router.get("/edit", productsController.edit)

module.exports = router;