import * as React from 'react';
import axios from "axios";
import Login from "./components/login";


const api = axios.create({
  baseURL: "/api",
  timeout: 1000,
});



export default api;
