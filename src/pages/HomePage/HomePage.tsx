import React from "react";
import { useState, useEffect } from "react";
import BookCard, { BookProps } from "../../components/BookCard";
import { checkIsAdmin, getUser } from "../../utils/auth";
import {
  borrowBook,
  getBooks,
  getBorrowedBooks,
  returnBook,
} from "../../api/books";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<
    { bookId: string; userId: number; id: string }[]
  >([]);

  const navigate = useNavigate();

  const loggedInUser = getUser();

  useEffect(() => {
    const handleGetBooks = async () => {
      try {
        const response = await getBooks();

        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const handleGetBorrowedBooks = async () => {
      try {
        const response = await getBorrowedBooks();
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching Borrowed books:", error);
      }
    };

    handleGetBooks();
    handleGetBorrowedBooks();
  }, []);

  const calculateRemainingQuantity = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    const borrowed = borrowedBooks.filter((b) => b.bookId === bookId).length;

    return book ? book.quantity - borrowed : 0;
  };

  const handleReturn = async (bookId: string) => {
    const borrowedBook = borrowedBooks.find(
      (b) => b.bookId === bookId && b.userId === loggedInUser.id
    );

    if (borrowedBook) {
      await returnBook(borrowedBook.id);

      const updatedBorrowedBooks = borrowedBooks.filter(
        (b) => b.bookId !== bookId && b.userId !== loggedInUser.id
      );
      setBorrowedBooks(updatedBorrowedBooks);
    }
  };

  const handleBorrow = async (bookId: string) => {
    const { data } = await borrowBook(bookId, loggedInUser.id);

    const updatedBorrowedBooks = [...borrowedBooks, { ...data }];
    setBorrowedBooks([...updatedBorrowedBooks]);
  };

  const handleEdit = (bookId: string) => () => {
    navigate(`admin/edit-book/${bookId}`);
  };

  const userBorrowedBooks = borrowedBooks.filter(
    (book) => book.userId === loggedInUser.id
  );

  const hasReachedLimit = userBorrowedBooks.length >= 2;

  const isAdmin = checkIsAdmin();

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-4 m-8">
        {books.map((book: BookProps) => (
          <BookCard
            key={book.id}
            book={book}
            remainingQuantity={calculateRemainingQuantity(book.id)}
            userHasBorrowed={borrowedBooks.some(
              (b) => b.bookId === book.id && b.userId === loggedInUser.id
            )}
            hasReachedLimit={hasReachedLimit}
            handleBorrow={handleBorrow}
            handleReturn={handleReturn}
            isAdmin={isAdmin}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
