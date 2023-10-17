using System;
using System.Net;
using API.Data;
using API.Models;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
	public class BookService : IBookService
	{
        private readonly AppDbContext _context;

        public BookService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _context.Books.ToList();
        }

        public Book GetBookById(int id)
        {
            return _context.Books.FirstOrDefault(b => b.Id == id);
        }

        public async Task AddBook(Book book, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                throw new ArgumentException("Image is required.");
            }

            string uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            string uniqueFileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            string filePath = Path.Combine(uploadFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            book.Image = uniqueFileName;

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateBook(int bookId, Book book, IFormFile? image)
        {
            var existingBook = _context.Books.FirstOrDefault(b => b.Id == bookId);

            if (image != null && image.Length > 0)
            {
                string uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                if (existingBook != null)
                {
                    var currentFilePath = Path.Combine(uploadFolder, existingBook.Image);
                    if (File.Exists(currentFilePath))
                        File.Delete(currentFilePath);
                }

                string uniqueFileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                string filePath = Path.Combine(uploadFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                book.Image = uniqueFileName;
            }

            if (existingBook != null)
            {
                existingBook.Title = book.Title;
                existingBook.Description = book.Description;
                existingBook.Authors = book.Authors;
                if (image != null && image.Length > 0)
                    existingBook.Image = book.Image;

                await _context.SaveChangesAsync();
            }
        }

        public void DeleteBook(int id)
        {
            var bookToDelete = _context.Books.FirstOrDefault(b => b.Id == id);

            if (bookToDelete != null)
            {
                string uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

                if (!string.IsNullOrEmpty(bookToDelete.Image))
                {
                    var currentFilePath = Path.Combine(uploadFolder, bookToDelete.Image);
                    if (File.Exists(currentFilePath))
                        File.Delete(currentFilePath);
                }

                _context.Books.Remove(bookToDelete);
                _context.SaveChanges();
            }
        }

    }
}