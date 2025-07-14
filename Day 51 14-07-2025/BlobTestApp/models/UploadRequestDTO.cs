using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace BlobTestApp.Models
{
    public class UploadRequestDto
    {
        [Required]
        [FromForm(Name = "file")]
        public IFormFile File { get; set; }
    }
}