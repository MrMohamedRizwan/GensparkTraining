using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class NewsManagementController : Controller
    {

        private readonly INewsService _newsService;

        public NewsManagementController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var news = await _newsService.GetAllNewsAsync();
            return Ok(news);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var news = await _newsService.GetNewsByIdAsync(id);
            if (news == null) return NotFound();

            return Ok(news);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewsRequestDTO news)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId");
            Console.WriteLine($"UserIdClaim: {news?.Title}");
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid userId))
            {
                return Unauthorized("Invalid user token.");
            }
            Console.WriteLine($"UserId: {userId}");
            if (userId == null)
            {
                return BadRequest("News data is required.");
            }

            await _newsService.CreateNewsAsync(news, userId);
            return Ok(new { message="News created successfully." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] NewsRequestDTO news)
        {
            var result = await _newsService.UpdateNewsAsync(id, news);
            if (!result) return NotFound();

            return Ok(new { message="News Updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _newsService.DeleteNewsAsync(id);
            if (!result) return Ok(new { message="News not found." });

            return Ok(new { message="News Deleted successfully." });
        }

        [HttpGet("export/csv")]
        public async Task<IActionResult> ExportToCsv()
        {
            var csvBytes = await _newsService.ExportNewsToCsvAsync();
            return File(csvBytes, "text/csv", $"NewsExport_{DateTime.Now:yyyyMMddHHmmss}.csv");
        }

        // [HttpGet("export/excel")]
        // public async Task<IActionResult> ExportToExcel()
        // {
        //     // Optional: Replace with true Excel generation
        //     return await ExportToCsv();
        // }
    }

}
