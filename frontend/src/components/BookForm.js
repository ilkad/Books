import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookForm() {
  const [book, setBook] = useState({
    title: '',
    description: '',
    authors: '',
    image: '',
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setBook({ ...book, image: file });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const history = useNavigate();

  const apiUrl = 'https://localhost:7194/api/books';

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('description', book.description);
    formData.append('authors', book.authors);
    formData.append('image', book.image.name);
    formData.append('file', book.image);

    axios.post(apiUrl, formData)
      .then((response) => {
        history('/');
      })
      .catch((error) => {
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
        <label htmlFor="authors" className="form-label">
          Authors
        </label>
        <select
          className="form-select"
          id="authors"
          name="authors"
          value={book.authors}
          onChange={handleChange}
        >
          <option value="">Select an author</option>
          <option value="Stefan cel mare">Stefan cel mare</option>
          <option value="Roweb developer">Roweb developer</option>
          <option value="Ilie">Ilie</option>
          <option value="Stefan">Stefan</option>
        </select>
        </div>
        <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={handleImageChange}
        />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
