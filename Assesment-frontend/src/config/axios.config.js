// First we need to import axios.js
import axios, { AxiosRequestHeaders } from "axios";
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://2bf6-27-34-65-64.ngrok-free.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
