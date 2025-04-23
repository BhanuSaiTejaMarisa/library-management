import { UserProps } from "../interfaces/UserProps";
import axiosInstance from "./axiosInstance";

export const getUsers = () => {
  return axiosInstance.get<UserProps[]>("/users");
};

export const deleteUser = (userId: string) => {
  return axiosInstance.delete<UserProps[]>(`/users/${userId}`);
};
