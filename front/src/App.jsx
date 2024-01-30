import React, { useEffect, useState } from "react";
import "./styles.css";
export const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  const handleSearch = async () => {
    if (!searchTerm) {
      return;
    }
    try {
      console.log(searchTerm);
      const res = await fetch(
        `http://localhost:3000/api/v1/books/${searchTerm}`
      );
      const data = await res.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/books/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const addBook = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      name: form[0].value,
      author: form[1].value,
    };
    try {
      const res = await fetch("http://localhost:3000/api/v1/books", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log(json);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Libreria MexiPeruana</h1>
      </header>
      <section>
        <p>Estos son los libros que están registrados actualmente</p>

        <div>
          <input
            type="text"
            placeholder="Buscar libro"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        <div>
          {books.map((librito) => (
            <div className="libro-container" key={librito._id}>
              <h3>Nombre de libro: {librito.name}</h3>
              <h3>Autor: {librito.author ? librito.author : "No definido"}</h3>
              <button onClick={handleDelete.bind(this, librito._id)}>X</button>
            </div>
          ))}
        </div>
        <div>
          <h2>Agregar nuevo libro</h2>
          <form onSubmit={addBook}>
            <label htmlFor="name">Nombre del libro</label>
            <input type="text" name="name" />
            <label htmlFor="author">Autor</label>
            <input type="text" name="author" />
            <button type="submit">Agregar</button>
          </form>
        </div>
      </section>
    </div>
  );
};
