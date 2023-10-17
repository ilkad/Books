import React, { useEffect } from 'react';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom';

function BookDelete() {
  const { id } = useParams();
  const history = useNavigate();
  const apiUrl = `https://localhost:7194/api/books/${id}`;

  const [book, setBook] = React.useState({
    title: '',
    description: '',
    authors: '',
    image: '',
  });

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const fetchedBook = response.data;
        setBook(fetchedBook);
      })
      .catch((error) => {

      });
  }, [apiUrl]);

  const deleteBook = () => {
    axios
      .delete(apiUrl)
      .then(() => {

        history('/');
      })
      .catch((error) => {

      });
  };

  return (
    <div>
      <p>Title: {book.title}</p>
      <p>Description: {book.description}</p>
      <p>Authors: {book.authors}</p>
      <p>Image: {book.image}</p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={deleteBook}
      >
        Delete Book
      </button>
    </div>
  );
}

export default BookDelete;
