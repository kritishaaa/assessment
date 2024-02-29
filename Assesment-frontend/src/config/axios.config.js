// First we need to import axios.js
import axios from "axios";
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://0ed9-27-34-65-64.ngrok-free.app/api",

  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default instance;
