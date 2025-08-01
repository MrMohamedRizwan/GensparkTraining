using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;
using MyMigration.Services;

namespace MyMigration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/category?page=1&pageSize=5
        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 10)
        {
            var categories = await _categoryService.GetAllCategories(page, pageSize);
            return Ok(categories);
        }

        // GET: api/category/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var category = await _categoryService.GetCategoryById(id);
            if (category == null) return NotFound();

            return Ok(category);
        }

        // POST: api/category
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryAddRequestDTO category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var success = await _categoryService.CreateCategory(category);
                if (!success) return Conflict(new { error = "Category Already Exist" });
                return Ok(new { message = "Category created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryAddRequestDTO category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            

            try
            {
                var success = await _categoryService.UpdateCategory(id, category);
                if (!success) return NotFound(new { error = "Category not found" });

                return Ok(new { message = "Category updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var success = await _categoryService.DeleteCategory(id);
                if (!success) return NotFound(new { error = "Category not found" });

                return Ok(new { message = "Category deleted successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
