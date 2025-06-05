using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Hubs;
using FirstAPI.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace FirstAPI.Services
{
    public class FileHandlerService : IFileHandlerService
    {
        private readonly string _uploadFolder;
        private readonly IHubContext<NotificationHub> _hubContext;

        public FileHandlerService(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
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
            // await _hubContext.Clients.All.SendAsync("ReceiveNotification", "🔥 Manual test from /test-signalr");

            if (file == null || file.Length == 0)
                throw new ArgumentException("Invalid file.");

            var filePath = Path.Combine(_uploadFolder, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            try
            {
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", $"New document uploaded: {file.FileName}");
            }
            catch
            {
                throw new Exception("Notification Error");
            }


            return file.FileName;
        }
        public async Task<string> TestNotification()
        {
            try
            {
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", "🔥 Manual test from /test-signalr");
                System.Console.WriteLine("Success ✅");
                return "Success";
            }
            catch (System.Exception)
            {
                System.Console.WriteLine("Failure ❌");
                throw;
            }
        }
    }
}