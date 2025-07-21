using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyWebApi.Models;

namespace MyWebApi.Interfaces
{
    public interface IVideoService
    {
        Task<List<Video>> GetAllAsync();
        Task<Video?> GetByIdAsync(Guid id);
        Task<Video> UploadAsync(IFormFile file, string title, string description);

    }
}