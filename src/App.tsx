import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import "./App.css";
interface BookProps {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksPromise = fetch("http://localhost:9000/books");
    booksPromise
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-orange-500 text-center">Bibliophile Cafe</h1>

      <div className="grid gap-12 lg:grid-cols-4 m-8">
      {books.map((book: BookProps) => (
        <div key={book.id}>
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm text-gray-700">{book.author}</p>
          <p className="text-sm text-gray-500">{book.description}</p>
          <img className="xl:w-md" src={book.image} />
        </div>
      ))}

      </div>
    </>
  );
}

export default App;
