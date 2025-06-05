using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FileHandlerController : ControllerBase
    {
        private readonly IFileHandlerService _fileService;

        public FileHandlerController(IFileHandlerService fileService)
        {
            _fileService = fileService;
        }
        [HttpGet]
        public IActionResult SendFileToClient(string fileName)
        {
            try
            {
                var fileBytes = _fileService.DownloadFile(fileName);
                return File(fileBytes, "application/octet-stream", fileName);
            }
            catch (FileNotFoundException)
            {
                return NotFound("File not found.");
            }
        }   
        [HttpPost]
        public async Task<IActionResult> GetFileFromClient(IFormFile file)
        {
            try
            {
                var fileName = await _fileService.UploadFileAsync(file);
                return Ok(new { message = "Upload successful", fileName });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}