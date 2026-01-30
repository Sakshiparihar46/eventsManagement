import axios from "axios";

const API = axios.create({
  baseURL: "https://eventsmanagement-5.onrender.com",
  withCredentials: true
});

export default API;
