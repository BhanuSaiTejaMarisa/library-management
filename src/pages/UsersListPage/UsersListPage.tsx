import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../api/users";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { UserProps } from "../../interfaces/UserProps";
import TableElements from "../../components/TableElements";

const UsersListPage = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const showSnackbar = useCustomSnackbar();

  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        showSnackbar("Error fetching users", "error");
      }
    };

    handleGetUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      showSnackbar("User deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting user:", error);
      showSnackbar("Error deleting user", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <TableElements.HeaderCell>Sno.</TableElements.HeaderCell>
              <TableElements.HeaderCell>Name</TableElements.HeaderCell>
              <TableElements.HeaderCell>Email</TableElements.HeaderCell>
              <TableElements.HeaderCell>Role</TableElements.HeaderCell>
              <TableElements.HeaderCell>Actions</TableElements.HeaderCell>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableElements.BodyCell>{index + 1}</TableElements.BodyCell>
                <TableElements.BodyCell>{user.name}</TableElements.BodyCell>
                <TableElements.BodyCell>{user.email}</TableElements.BodyCell>
                <TableElements.BodyCell>{user.role}</TableElements.BodyCell>
                <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListPage;
