import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 3000,
});

export {api};