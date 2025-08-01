using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface INewsService
    {
        
        Task<IEnumerable<NewsReponseDTO>> GetAllNewsAsync();
        Task<NewsReponseDTO?> GetNewsByIdAsync(Guid id);
        Task<News> CreateNewsAsync(NewsRequestDTO news, Guid userId);
        Task<bool> UpdateNewsAsync(Guid id, NewsRequestDTO news);
        Task<bool> DeleteNewsAsync(Guid id);
        Task<byte[]> ExportNewsToCsvAsync();
    
    }
}