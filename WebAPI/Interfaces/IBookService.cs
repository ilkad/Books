using API.Models;
namespace WebAPI.Interfaces
{
    public interface IBookService
    {
        IEnumerable<Book> GetAllBooks();
        Book GetBookById(int id);
        Task AddBook(Book book, IFormFile image);
        Task UpdateBook(int bookId, Book book, IFormFile? image);
        void DeleteBook(int id);
    }
}

