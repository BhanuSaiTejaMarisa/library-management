import React from "react";
import { useState, useEffect } from "react";

interface BookProps {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  image: string;
}

const HomePage = () => {
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
   

      <div className="grid gap-12 lg:grid-cols-4 m-8">
        {books.map((book: BookProps) => (
          <div key={book.id} className="">
            <img className="w-32" src={book.image} />
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-700">{book.author}</p>
            <p className="text-sm text-gray-500">{book.subtitle}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
