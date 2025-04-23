import React, { useEffect } from "react";

import { getBorrowedHistory } from "../../api/books";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-medium text-gray-600">
    {children}
  </th>
);

const TableBodyCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
    {children}
  </td>
);

const AdminPage = () => {
  const [history, setHistory] = React.useState<
    {
      id: string;
      bookTitle: string;
      username: string;
      status: string;
      borrowedDate: string;
      returnDate: string;
    }[]
  >([]);

  const showSnackbar = useCustomSnackbar();

  useEffect(() => {
    const handleGetBorrowedHistory = async () => {
      try {
        const response = await getBorrowedHistory();
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching Borrowed History:", error);
        showSnackbar("Error fetching borrowed books", "error");
      }
    };

    handleGetBorrowedHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Borrowed History
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <TableHeaderCell>Sno.</TableHeaderCell>
              <TableHeaderCell>Book Title</TableHeaderCell>
              <TableHeaderCell>Username</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Borrowed Date</TableHeaderCell>
              <TableHeaderCell>Return Date</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item.bookTitle}</TableBodyCell>
                <TableBodyCell>{item.username}</TableBodyCell>
                <TableBodyCell>
                  <span
                    className={
                      item.status === "returned"
                        ? "text-green-600 font-medium"
                        : "text-orange-600 font-medium"
                    }
                  >
                    {item.status}
                  </span>
                </TableBodyCell>
                <TableBodyCell>{item.borrowedDate}</TableBodyCell>
                <TableBodyCell>{item.returnDate || "N/A"}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
