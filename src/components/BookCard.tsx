import React from "react";

export interface BookProps {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  image: string;
  quantity: number;
  category: string;
}

const BookCard = ({
  book,
  remainingQuantity,
  userHasBorrowed,
  hasReachedLimit,
  handleBorrow,
  handleReturn,
  isAdmin,
  handleEdit,
}: {
  book: BookProps;
  remainingQuantity: number;
  userHasBorrowed: boolean;
  hasReachedLimit: boolean;
  handleBorrow: (bookId: string, bookTitle: string) => void;
  handleReturn: (bookId: string) => void;
  isAdmin: boolean;
  handleEdit: (bookId: string) => () => void;
}) => {
  return (
    <div className="p-4 rounded shadow-md bg-white w-48 flex flex-col justify-between relative">
      <div>
        <img className="mx-auto mb-4" src={book.image} alt={book.title} />
        <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-700">{book.author}</p>
        <p className="text-sm text-gray-500">{book.subtitle}</p>
        <p className="text-sm font-medium mt-2">
          {remainingQuantity > 0 ? (
            <span className="text-green-600">
              Available: {remainingQuantity}
            </span>
          ) : (
            <span className="text-red-600">Not Available</span>
          )}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        {userHasBorrowed ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => handleReturn(book.id)}
          >
            Return
          </button>
        ) : remainingQuantity > 0 ? (
          <button
            className={`px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              hasReachedLimit
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500"
            }`}
            disabled={hasReachedLimit}
            onClick={() => handleBorrow(book.id, book.title)}
          >
            Borrow
          </button>
        ) : (
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
            disabled
          >
            Not Available
          </button>
        )}
      </div>
      {isAdmin && (
        <button
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          onClick={handleEdit(book.id)}
        >
          edit
        </button>
      )}
    </div>
  );
};

export default BookCard;
