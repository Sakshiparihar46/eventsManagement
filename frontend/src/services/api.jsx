import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://eventsmanagement6.onrender.com",
  withCredentials: true
});

export default API;
