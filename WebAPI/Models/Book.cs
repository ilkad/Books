using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Authors { get; set; }

        [Required]
        public string Image { get; set; }
    }
}