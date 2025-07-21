using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyWebApi.Models.DTO
{
    public class UploadVideoRequestDTO
    {
            [Required]
        public IFormFile File { get; set; }

        public string Title { get; set; }
            public string Description { get; set; } = string.Empty;

        
        
    }
}