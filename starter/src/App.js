import "./App.css";
import { useState, useEffect } from "react";
import * as booksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import MyReads from "./pages/MyReads";
import SearchBooks from "./pages/SearchBooks";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [shelfBooks, setShelfBooks] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = async (shelf, book) => {
    setSelectedOption(null);
    await booksAPI.update(book, shelf);
    setSelectedOption(shelf);
  };
  useEffect(() => {
    const getAllBooks = async () => {
      const response = await booksAPI.getAll();
      if (response) setShelfBooks(response);
    };
    getAllBooks();
  }, [selectedOption]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <MyReads allBooks={shelfBooks} onChangeBookShelf={handleChange} />
        }
      />
      <Route
        exact
        path="/search"
        element={
          <SearchBooks
            onChangeBookShelf={handleChange}
            shelfBooks={shelfBooks}
          />
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
