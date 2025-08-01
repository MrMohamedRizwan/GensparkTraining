using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Services
{
    public class NewService : INewsService
    {
        private readonly IRepository<Guid, News> _newsRepository;
        private readonly IRepository<Guid, User> _userRepository;

        public NewService(IRepository<Guid, News> newsRepository, IRepository<Guid, User> userRepository)
        {
            _newsRepository = newsRepository;
            _userRepository = userRepository;
        }
        public async Task<News> CreateNewsAsync(NewsRequestDTO news,Guid userId)
        {
            if (news == null)
            {
                throw new ArgumentNullException(nameof(news), "News cannot be null");
            }
            try
            {
                var existingNews = (await _newsRepository.GetAll()).FirstOrDefault(n => n.Title == news.Title);
                if (existingNews != null)
                {
                    throw new Exception("News with the same title already exists");
                }
                var newNews = new News
                {
                    NewsId = Guid.NewGuid(),
                    UserId = userId,
                    Title = news.Title,
                    ShortDescription = news.ShortDescription,
                    Image = news.Image,
                    Content = news.Content,
                    CreatedDate =DateTime.UtcNow,
                    Status = Guid.Empty // Assuming Status is a Guid, adjust as necessary
                };
                await _newsRepository.Add(newNews);
                return newNews;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while creating the news: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteNewsAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentException("News ID should not be empty", nameof(id));
            }
            var existingNews = await _newsRepository.Get(id);
            if (existingNews == null)
            {
                throw new Exception("News not found");
            }
            try
            {
                await _newsRepository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the news: {ex.Message}", ex);
            }
        }

        public async Task<byte[]> ExportNewsToCsvAsync()
        {
            var sb = new StringBuilder();
            sb.AppendLine("NewsId,Title,ShortDescription,CreatedDate,Status");

            var listNews = (await _newsRepository.GetAll()).OrderBy(x => x.NewsId).ToList();
            foreach (var news in listNews)
            {
                sb.AppendLine($"{news.NewsId},\"{news.Title}\",\"{news.ShortDescription}\",{news.CreatedDate},{news.Status}");
            }

            return Encoding.UTF8.GetBytes(sb.ToString());
        }

        public async Task<IEnumerable<NewsReponseDTO>> GetAllNewsAsync()
        {
            // return await _newsRepository.GetAll();
            // Fetch user name for each news item and attach it (if needed)
            var newsList = await _newsRepository.GetAll();
            var responseList = new List<NewsReponseDTO>();
            foreach (var news in newsList)
            {
                var user = (await _userRepository.GetAll())
                .FirstOrDefault(u => u.UserId == news.UserId);
                
                                          

                var dto = new NewsReponseDTO
                {
                    NewsId = news.NewsId,
                    Title = news.Title,
                    ShortDescription = news.ShortDescription,
                    Image = news.Image,
                    Content = news.Content,
                    CreatedDate = news.CreatedDate.Value,
                    // Status = news.Status.Value,
                    userId = news.UserId.Value,
                    userName = user.Username
                };
                responseList.Add(dto);
            }
            return responseList;
        }

        public async Task<NewsReponseDTO?> GetNewsByIdAsync(Guid id)
        {
            var news = await _newsRepository.Get(id);
            if (news == null)
            {
                return null;
            }
var user = (await _userRepository.GetAll())
                .FirstOrDefault(u => u.UserId == news.UserId);
                
            return new NewsReponseDTO
            {
                NewsId = news.NewsId,
                Title = news.Title,
                ShortDescription = news.ShortDescription,
                Image = news.Image,
                Content = news.Content,
                CreatedDate = news.CreatedDate.Value,
                // Status = news.Status.Value,
                userId = news.UserId.Value,
                userName = user.Username
            };
        }

        public async Task<bool> UpdateNewsAsync(Guid id, NewsRequestDTO news)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentException("News ID should not be empty", nameof(id));
            }
            if (news == null)
            {
                throw new ArgumentNullException(nameof(news), "News cannot be null");
            }
            var existingNews = await _newsRepository.Get(id);
            if (existingNews == null)
            {
                throw new Exception("News not found");
            }
            try
            {
                existingNews.Title = news.Title;
                existingNews.ShortDescription = news.ShortDescription;
                existingNews.Image = news.Image;
                existingNews.Content = news.Content;
                await _newsRepository.Update(id,existingNews);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the news: {ex.Message}", ex);
            }
        }
    }
}