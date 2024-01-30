const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Estos son todos las categorias disponibles en este momento.");
});

module.exports = router;
