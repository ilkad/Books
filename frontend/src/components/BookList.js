import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

function BookList() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://localhost:7194/api/books';
  
    axios
      .get(apiUrl)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      <table className="table table-striped">
      <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Authors</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.authors}</td>
              <td>
                <img src={`https://localhost:7194/uploads/${book.image}`} alt={book.title} style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <Link to={`/update/${book.id}`} className="btn btn-primary">Edit</Link>
                <Link to={`/delete/${book.id}`} className="btn btn-danger">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add" className="btn btn-primary">Add Book</Link>
    </div>
  );
}

export default BookList;
