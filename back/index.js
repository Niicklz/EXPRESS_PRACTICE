const express = require("express");
const routerApi = require("./routes");
const mongoConnect = require("./mongoose");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

routerApi(app);
//conectar a mongo
mongoConnect();
app.listen(PORT, () => {
  console.log("Server up!");
});
