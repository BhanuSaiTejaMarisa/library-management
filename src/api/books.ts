import axiosInstance from "./axiosInstance";
import { BookProps } from "../components/BookCard";

// fetch all books
export const getBooks = () => {
  return axiosInstance.get("/books");
};

// fetch book by id
export const getBookById = (bookId: string) => {
  return axiosInstance.get(`/books/${bookId}`);
};

// update book quantity
export const updateBookQuantity = (
  bookId: string,
  quantity: number
): Promise<void> => {
  return axiosInstance.patch(`/books/${bookId}`, { quantity });
};

// create new book
export const createBook = (book: BookProps) => {
  return axiosInstance.post("/books", book);
};

// borrowedBooks apis

export const getBorrowedBooks = () => {
  return axiosInstance.get("/borrowedBooks");
};

export const borrowBook = (bookId: string, userId: number) => {
  return axiosInstance.post("/borrowedBooks", {
    bookId,
    userId,
  });
};

export const returnBook = (id: string) => {
  return axiosInstance.delete(`/borrowedBooks/${id}`);
};
