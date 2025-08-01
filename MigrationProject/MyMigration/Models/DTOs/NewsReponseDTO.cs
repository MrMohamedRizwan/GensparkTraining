using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class NewsReponseDTO
    {
        public Guid userId { get; set; }=Guid.NewGuid();

        public Guid NewsId { get; set; }
        public string userName{get; set; } = string.Empty;
        public string Title { get; set; }=string.Empty;
        public string ShortDescription { get; set; }=string.Empty;
        public string Image { get; set; }=string.Empty;
        public string Content { get; set; }=string.Empty;
        public DateTime CreatedDate { get; set; }=DateTime.UtcNow;
        // public Guid Status { get; set; }=Guid.NewGuid();

    }
}