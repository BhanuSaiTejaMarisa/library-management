import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // Optional: Set a timeout for requests
});

export default axiosInstance;
