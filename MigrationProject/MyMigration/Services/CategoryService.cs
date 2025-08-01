using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Guid, Category> _categoryRepository;
        public CategoryService(IRepository<Guid, Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        public async Task<bool> CreateCategory(CategoryAddRequestDTO category)
        {
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category), "Category cannot be null");
            }
            try
            {
                var existingCategory = (await _categoryRepository.GetAll()).FirstOrDefault(c => c.Name == category.Name);
                if (existingCategory != null)
                {
                    throw new Exception("Category Already Exist");
                }
                var newCategory = new Category
                {
                    CategoryId = Guid.NewGuid(),
                    Name = category.Name,
                };
                await _categoryRepository.Add(newCategory);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw new Exception($"An error occurred while creating the category: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteCategory(Guid id)
        {
            if (id == null)
            {
                throw new Exception("Category ID cannot be null");
            }
            var category = await _categoryRepository.Get(id);
            if (category == null)
            {
                throw new Exception("Category not found");
            }
            try
            {
                await _categoryRepository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the category: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<Category>> GetAllCategories(int page, int pageSize)
        {
            var categories = await _categoryRepository.GetAll();
            return categories
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public async Task<Category?> GetCategoryById(Guid id)
        {
            return await _categoryRepository.Get(id);
        }

        public async Task<bool> UpdateCategory(Guid id, CategoryAddRequestDTO category)
        {
            if (id ==null)
            {
                throw new ArgumentException("Category ID should not be null");
            }
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category), "Category cannot be null");
            }
            try
            {
                var existingCategory = await _categoryRepository.Get(id);
                if (existingCategory == null)
                {
                    throw new Exception("Category not found");
                }
                existingCategory.Name = category.Name;
                await _categoryRepository.Update(id, existingCategory);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the category: {ex.Message}", ex);
            }
        }
    }
}