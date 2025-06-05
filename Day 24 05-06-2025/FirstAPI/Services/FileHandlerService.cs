using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;

namespace FirstAPI.Services
{
    public class FileHandlerService : IFileHandlerService
    {
        private readonly string _uploadFolder;

        public FileHandlerService()
        {
            _uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

            if (!Directory.Exists(_uploadFolder))
                Directory.CreateDirectory(_uploadFolder);
        }

        public byte[] DownloadFile(string fileName)
        {
            var filePath = Path.Combine(_uploadFolder, fileName);

            if (!File.Exists(filePath))
                throw new FileNotFoundException("File not found.", fileName);

            return File.ReadAllBytes(filePath);
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Invalid file.");

            var filePath = Path.Combine(_uploadFolder, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return file.FileName; // You can return path if needed
        }
    }
}