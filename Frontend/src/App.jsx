import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/books/Home";
import EditBook from "./pages/books/EditBook"
import CreateBook from "./pages/books/CreateBook"
import DeleteBook from "./pages/books/DeleteBook"
import ShowBook from "./pages/books/ShowBook"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/Books/edit/:_id" element={<EditBook />} />
      <Route path="/Books/create" element={<CreateBook />} />
      <Route path="/Books/delete/:_id" element={<DeleteBook />} />
      <Route path="/Books/details/:_id" element={<ShowBook />} />
    </Routes>
  )
}

export default App;