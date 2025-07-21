using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyWebApi.Interfaces;
using MyWebApi.Models;

namespace MyWebApi.Service
{
    public class VideoService : IVideoService
    {
        private readonly IRepository<Guid, Video> _repository;
        private readonly BlobStorageService _blobStorageService;

        public VideoService(IRepository<Guid, Video> repository, BlobStorageService blobStorageService)
        {
            _repository = repository;
            _blobStorageService = blobStorageService;
        }
        public async Task<List<Video>> GetAllAsync()
        {
            var videos = await _repository.GetAll();
            return videos.ToList();
        }

        public async Task<Video?> GetByIdAsync(Guid id)
        {
            var videos = await _repository.Get(id);
            return videos;
            
        }

        public async Task<Video> UploadAsync(IFormFile file, string title, string description)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is empty");
            
            string blobUrl;
            try
            {
                blobUrl = await _blobStorageService.UploadFileAsync(file);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                throw new InvalidOperationException("Failed to upload file to blob storage.", ex);
            }

            var video = new Video
            {
                Title = title,
                Description = description,
                BlobUrl = blobUrl,
                UploadDate = DateTime.UtcNow
            };

            await _repository.Add(video);
            return video;
        }
    }
}