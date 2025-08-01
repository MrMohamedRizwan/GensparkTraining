using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface ICategoryService
    {
        Task<bool> CreateCategory(CategoryAddRequestDTO category);
        Task<bool> UpdateCategory(Guid id, CategoryAddRequestDTO category);
        Task<bool> DeleteCategory(Guid id);
        Task<Category?> GetCategoryById(Guid id);
        Task<IEnumerable<Category>> GetAllCategories(int page, int pageSize);
    }
}