using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class ProgressCreateDTO
    {
        [Required(ErrorMessage = "Image file is required.")]
        public IFormFile ImageFile { get; set; } = null!;

        [Range(0.5, 2.5, ErrorMessage = "Height must be between 0.5 and 2.5 meters.")]
        public float Height { get; set; }

        [Range(10, 300, ErrorMessage = "Weight must be between 10 and 300 kg.")]
        public float Weight { get; set; }
    }

    public class ProgressResponseDTO
    {
        public Guid Id { get; set; }
        public string ImagePath { get; set; } = string.Empty;
        public float Height { get; set; }
        public float Weight { get; set; }
        public DateTime UploadedAt { get; set; }
        public Guid ClientId { get; set; }
    }
}