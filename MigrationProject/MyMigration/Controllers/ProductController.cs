using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyMigration.Interfaces;
using MyMigration.Models;

namespace MyMigration.Controllers
{
    [Route("/api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public async Task<IActionResult> GetProductsAsync(int page, int pageSize, Guid? categoryId)
        {
            var products = await _productService.GetProductsAsync(page, pageSize, categoryId);
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductByIdAsync(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddProduct([FromBody] ProductCreateDto dto)
        {

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId");
            // Console.WriteLine($"UserIdClaim: {news?.Title}");
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid userId))
            {
                return Unauthorized("Invalid user token.");
            }
            Console.WriteLine($"UserId: {userId}");
            if (userId == null)
            {
                return BadRequest("Product data is required.");
            }

            var product = await _productService.AddProductAsync(dto, userId);
            return Ok(product);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] ProductCreateDto dto)
        {
            Console.WriteLine($"UpdateProduct called with id: {id}");
            // var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            // if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid userId))
            // {
            //     return Unauthorized("Invalid user token.");
            // }

            var product = await _productService.UpdateProductAsync(id, dto);
            return Ok(product);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var success = await _productService.DeleteProductAsync(id);
            if (!success)
            {
                return NotFound();
            }
            return Ok(new { Message = "Product deleted successfully." });
        }



    }
}