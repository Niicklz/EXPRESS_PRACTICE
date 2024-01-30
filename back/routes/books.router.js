const express = require("express");
const router = express.Router();
const Books = require("./../models/booksSchema");

router.get("/", async (req, res) => {
  try {
    const allBooks = await Books.find({});
    console.log(allBooks);
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:author", async (req, res) => {
  try {
    const author = req.params.author;
    console.log(author);
    const booksByAuthor = await Books.find({ author: author });
    console.log(booksByAuthor);
    res.status(200).json(booksByAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener los libros por autor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const newBook = new Books({
      name: body.name,
      description: body.description,
      author: body.author,
      bookImg: body.bookImg,
    });

    await newBook.save();
    res.status(201).json({ msg: "Libro guardado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Faltan datos para poder agregar el nombre" });
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  const paramID = req.params.id;

  const update = {
    $set: {
      name: body.name,
      description: body.description,
      author: body.author,
      libroImg: body.libroImg,
    },
  };
  await Books.updateOne({ _id: paramID }, update);
  res.status(203).json({ msg: "actualizao" });
});

router.delete("/:id", async (req, res) => {
  try {
    await Books.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Usuario no encontrado" });
  }
});

module.exports = router;
