const mongoose = require("mongoose");
require("dotenv").config(); // Para utilizar las variables de entorno

const mongoDB = `${process.env.MONGODB_URI}`;

async function mongoConnect() {
  try {
    await mongoose.connect(mongoDB);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = mongoConnect;
