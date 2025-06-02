using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BankAppApi.Interface;

namespace BankAppApi.Services
{
    public class FaqService : IFaqService
    {
        private static readonly HttpClient client = new HttpClient();

        public async Task<string> SendResponse(string question)
        {
            var url = "http://127.0.0.1:5000/predict";

            var data = new { question = question };
            var jsonString = JsonSerializer.Serialize(data);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

            try
            {
                var response = await client.PostAsync(url, content);
                response.EnsureSuccessStatusCode();
                var responseJSON = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseJSON);
                var answer = doc.RootElement.GetProperty("answer").GetString();
                return answer;
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
    }
}