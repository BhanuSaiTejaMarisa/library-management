import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBookQuantity } from "../../api/books";
import CustomInput from "../../components/CustomInput";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { BookProps } from "../../interfaces/BookProps";

const EditBookPage = () => {
  const [book, setBook] = useState<BookProps>({} as BookProps);

  const showSnackbar = useCustomSnackbar();

  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      const fetchBookDetails = async () => {
        try {
          const response = await getBookById(bookId);

          setBook(response.data);
        } catch (error) {
          console.error("Error fetching book details:", error);
          showSnackbar("Error fetching book details", "error");
        }
      };
      fetchBookDetails();
    }
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (bookId) {
        await updateBookQuantity(bookId, book.quantity);
        showSnackbar("Book updated successfully");
      } else {
        await createBook(book);
        showSnackbar("Book created successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      showSnackbar("Error updating book", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      setBook({ ...book, [name]: parseInt(value) });
      return;
    }
    setBook({ ...book, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1>Edit Book</h1>
      <form className="grid" onSubmit={handleSubmit}>
        <label>Title</label>
        <CustomInput
          name="title"
          type="text"
          disabled={bookId}
          defaultValue={book.title}
          onChange={handleChange}
        />
        <label>Subtitle</label>
        <CustomInput
          name="subtitle"
          type="text"
          disabled={bookId}
          defaultValue={book.subtitle}
          onChange={handleChange}
        />
        <label>Description</label>
        <CustomInput
          name="description"
          type="text"
          disabled={bookId}
          defaultValue={book.description}
          onChange={handleChange}
        />
        <label>Author</label>
        <CustomInput
          name="author"
          type="text"
          disabled={bookId}
          defaultValue={book.author}
          onChange={handleChange}
        />
        <label>Image URL</label>
        <CustomInput
          name="image"
          type="text"
          disabled={bookId}
          defaultValue={book.image}
          onChange={handleChange}
        />
        <label>Category</label>
        <CustomInput
          name="category"
          type="text"
          disabled={bookId}
          defaultValue={book.category}
          onChange={handleChange}
        />
        <label>Quantity</label>
        <CustomInput
          name="quantity"
          type="number"
          defaultValue={book.quantity}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditBookPage;
