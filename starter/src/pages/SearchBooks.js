import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as booksAPI from "../BooksAPI";
import BookShelf from "../components/BookShelf";
import { SELFS } from "../utils/constants";
import debounce from "lodash/debounce";

const SearchBooks = ({ shelfBooks, onChangeBookShelf }) => {
  const [searchedBooks, setSearchedBook] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setError(null);
    if (query) {
      const search = async () => {
        const response = await booksAPI.search(query, 10);
        if (response.error) {
          setError(response.error);
        } else {
          const mappedWithSelfBooks = response.map((book) => {
            const bookInShelf = shelfBooks.find(
              (shelfBook) => shelfBook.id === book.id,
            );
            return {
              ...book,
              shelf: bookInShelf ? bookInShelf.shelf : SELFS.NONE,
            };
          });
          setSearchedBook(mappedWithSelfBooks);
        }
      };
      search();
    } else {
      setSearchedBook([]);
    }
  }, [query, shelfBooks]);
  const handleChangeQuery = debounce(async (event) => {
    // console.log("changed", event.target.value);
    setQuery(event.target.value);
  }, 500);

  const handleChange = async (shelf, book) => {
    await booksAPI.update(book, shelf);
    onChangeBookShelf(shelf, book);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleChangeQuery}
          />
        </div>
      </div>
      <div className="search-books-results">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <BookShelf
            title="Search Books Results"
            books={searchedBooks}
            onChangeBookShelf={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
