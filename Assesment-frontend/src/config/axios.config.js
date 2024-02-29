// First we need to import axios.js
import axios from "axios";
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "http://localhost:8000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
