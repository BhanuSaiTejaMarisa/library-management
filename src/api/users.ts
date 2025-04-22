import axiosInstance from "./axiosInstance";
interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const getUsers = () => {
  return axiosInstance.get<UserProps[]>("/users");
};
