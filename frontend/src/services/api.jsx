import axios from "axios";

const API = axios.create({
  baseURL: " https://eventsmanagement6.onrender.com",
  withCredentials: true
});

export default API;
