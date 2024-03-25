import React from "react";
import Header from "../components/Header";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import { SELFS } from "../utils/constants";

const MyReads = ({ allBooks, onChangeBookShelf }) => {
  const currentlyReadings = allBooks.filter(
    (book) => book.shelf === SELFS.CURRENTLY_READING,
  );
  const wantToReads = allBooks.filter(
    (book) => book.shelf === SELFS.WANT_TO_READ,
  );
  const reads = allBooks.filter((book) => book.shelf === SELFS.READ);
  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={currentlyReadings}
            onChangeBookShelf={onChangeBookShelf}
          />
          <BookShelf
            title="Want To Read"
            books={wantToReads}
            onChangeBookShelf={onChangeBookShelf}
          />
          <BookShelf
            title="Read"
            books={reads}
            onChangeBookShelf={onChangeBookShelf}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default MyReads;
