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

export const postBorrowedHistory = ({
  bookId,
  bookTitle,
  userId,
  username,
  borrowedDate,
}: {
  bookId: string;
  userId: number;
  borrowedDate: string;
  bookTitle: string;
  username: string;
}) => {
  return axiosInstance.post("/borrowedHistory", {
    bookId,
    bookTitle,
    userId,
    username,
    status: "borrowed",
    borrowedDate,
    returnDate: "",
  });
};

export const fetchBorrowedHistoryByParams = async (
  bookId: string,
  userId: string
) => {
  return axiosInstance.get(
    `/borrowedHistory?userId=${userId}&bookId=${bookId}`
  );
};

export const updateBorrowedHistory = (
  id: string,
  returnDate: string
): Promise<void> => {
  return axiosInstance.patch(`/borrowedHistory/${id}`, {
    status: "returned",
    returnDate,
  });
};

export const getBorrowedHistory = () => {
  return axiosInstance.get("/borrowedHistory");
};
