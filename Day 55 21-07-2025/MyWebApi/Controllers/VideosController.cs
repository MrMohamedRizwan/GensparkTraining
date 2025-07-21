using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyWebApi.Interfaces;
using MyWebApi.Models.DTO;

namespace MyWebApi.Controllers
{
    [Route("/api/[controller]")]
    public class VideosController : ControllerBase
    {
        private readonly IVideoService _videoService;

        public VideosController(IVideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] UploadVideoRequestDTO dto)
        {
            Console.WriteLine($"\n\nUpload called{dto}\n\nn\n");
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("Invalid file");
            // return Ok("File upload");
            var video = await _videoService.UploadAsync(dto.File, dto.Title, dto.Description);
            return CreatedAtAction(nameof(GetById), new { id = video.Id }, new { video.Id, video.Title, video.Description, video.BlobUrl });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var videos = await _videoService.GetAllAsync();
            var result = videos.Select(v => new { v.Id, v.Title, v.Description, v.BlobUrl });
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var video = await _videoService.GetByIdAsync(id);
            if (video == null) return NotFound();
            return Ok(video);
        }

        [HttpGet("{id}/stream")]
        public async Task<IActionResult> Stream(Guid id)
        {
            var video = await _videoService.GetByIdAsync(id);
            if (video == null) return NotFound();

            return Redirect(video.BlobUrl);
        }

    }
}