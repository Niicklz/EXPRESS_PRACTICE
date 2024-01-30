const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  bookImg: {
    type: String,
    default: () => {
      return "https://www.comunidadbaratz.com/wp-content/uploads/Instrucciones-a-tener-en-cuenta-sobre-como-se-abre-un-libro-nuevo.jpg";
    },
  },
});

module.exports = mongoose.model("Books", booksSchema);
