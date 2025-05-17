import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 5000,
  headers : {
    "Content-Type": "application/json"
  },
  // responseType: "json"
})

export default axiosInstance;