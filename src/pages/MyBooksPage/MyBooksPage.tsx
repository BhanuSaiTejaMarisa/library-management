import React, { useEffect, useState } from "react";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import TableElements from "../../components/TableElements";
import {
  fetchBorrowedHistoryByParams,
  getUserBorrowedBooks,
  returnBook,
  updateBorrowedHistory,
} from "../../api/books";
import { getUserFromStorage } from "../../utils/auth";
import { BorrowedBookProps } from "../../interfaces/BorrowedBookProps";
import { getCurrentDateTime } from "../../utils/date";

const MyBooksPage = () => {
  const [userBorrowedbooks, setUserBorrowedBooks] = useState<
    BorrowedBookProps[]
  >([]);

  const showSnackbar = useCustomSnackbar();
  const loggedInUser = getUserFromStorage();

  useEffect(() => {
    const handleGetBorrowedBooks = async () => {
      try {
        const response = await getUserBorrowedBooks(loggedInUser.id);
        setUserBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching User books:", error);
        showSnackbar("Error fetching User books", "error");
      }
    };

    handleGetBorrowedBooks();
  }, []);

  const handleReturn = async (borrowedId: string, bookId: string) => {
    try {
      await returnBook(borrowedId);

      const { data: userBooksInHistory } = await fetchBorrowedHistoryByParams({
        bookId,
        userId: loggedInUser.id,
      });
      await updateBorrowedHistory(
        userBooksInHistory[0].id,
        getCurrentDateTime()
      );

      setUserBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
      showSnackbar("Book returned successfully", "success");
    } catch (error) {
      console.error("Error returning book:", error);
      showSnackbar("Error returning book", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Books</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <TableElements.HeaderCell>Sno.</TableElements.HeaderCell>
              <TableElements.HeaderCell>Title</TableElements.HeaderCell>
              <TableElements.HeaderCell>Author</TableElements.HeaderCell>
              <TableElements.HeaderCell>Borrowed Date</TableElements.HeaderCell>
              <TableElements.HeaderCell>Actions</TableElements.HeaderCell>
            </tr>
          </thead>
          <tbody>
            {userBorrowedbooks.map((book, index) => (
              <tr
                key={book.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableElements.BodyCell>{index + 1}</TableElements.BodyCell>
                <TableElements.BodyCell>{book.title}</TableElements.BodyCell>
                <TableElements.BodyCell>{book.author}</TableElements.BodyCell>
                <TableElements.BodyCell>
                  {book.borrowedDate}
                </TableElements.BodyCell>
                <TableElements.BodyCell>
                  <button
                    onClick={() => handleReturn(book.id as string, book.bookId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-2"
                  >
                    Return
                  </button>
                </TableElements.BodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooksPage;
