import React, { useEffect } from "react";

import { getBorrowedHistory } from "../../api/books";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import TableElements from "../../components/TableElements";

const AdminPage = () => {
  const [history, setHistory] = React.useState<
    {
      id: string;
      title: string;
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
              <TableElements.HeaderCell>Sno.</TableElements.HeaderCell>
              <TableElements.HeaderCell>Book Title</TableElements.HeaderCell>
              <TableElements.HeaderCell>Username</TableElements.HeaderCell>
              <TableElements.HeaderCell>Status</TableElements.HeaderCell>
              <TableElements.HeaderCell>Borrowed Date</TableElements.HeaderCell>
              <TableElements.HeaderCell>Return Date</TableElements.HeaderCell>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableElements.BodyCell>{index + 1}</TableElements.BodyCell>
                <TableElements.BodyCell>{item.title}</TableElements.BodyCell>
                <TableElements.BodyCell>{item.username}</TableElements.BodyCell>
                <TableElements.BodyCell>
                  <span
                    className={
                      item.status === "returned"
                        ? "text-green-600 font-medium"
                        : "text-orange-600 font-medium"
                    }
                  >
                    {item.status}
                  </span>
                </TableElements.BodyCell>
                <TableElements.BodyCell>
                  {item.borrowedDate}
                </TableElements.BodyCell>
                <TableElements.BodyCell>
                  {item.returnDate || "N/A"}
                </TableElements.BodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
