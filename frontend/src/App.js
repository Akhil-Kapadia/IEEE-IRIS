import { Routes, Route } from "react-router-dom";
import * as React from "react";

import Register from "./components/register";
import SignIn from "./components/SignIn";
import Layout from "./components/layout";

function App() {

  return (
  <main>
    <Routes>
      <Route index element={<Layout/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  </main>
  );
}

export default App;
