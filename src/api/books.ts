import { BookProps } from "../interfaces/BookProps";
import { BorrowedBookProps } from "../interfaces/BorrowedBookProps";
import axiosInstance from "./axiosInstance";

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

export const getUserBorrowedBooks = (userId: string) => {
  return axiosInstance.get(`/borrowedBooks/?userId=${userId}`);
};

export const borrowBook = (body: BorrowedBookProps) => {
  return axiosInstance.post("/borrowedBooks", body);
};

export const returnBook = (id: string) => {
  return axiosInstance.delete(`/borrowedBooks/${id}`);
};

export const postBorrowedHistory = (body:BorrowedBookProps) => {
  return axiosInstance.post("/borrowedHistory", {
    status: "borrowed",
    returnDate: "",
    ...body,
  });
};

export const fetchBorrowedHistoryByParams = async (params: {
  bookId?: string;
  userId?: string;
  status?: string;
}) => {
  return axiosInstance.get(`/borrowedHistory`, {
    params: {
      ...params,
      status: params.status || "borrowed",
    },
  });
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
