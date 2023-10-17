import React from 'react';
import BookList from './components/BookList';
import BookFormPage from './components/BookFormPage';
import BookUpdateFormPage from './components/BookUpdateFormPage';
import BookDeletePage from './components/BookDeletePage';

const AppRoutes = [
  {
    index: true,
    element: <BookList />
  },
  {
    path: '/add',
    element: <BookFormPage />
  },
  {
    path: '/update/:id',
    element: <BookUpdateFormPage />
  },
  {
    path: '/delete/:id',
    element: <BookDeletePage />
  }
];

export default AppRoutes;
