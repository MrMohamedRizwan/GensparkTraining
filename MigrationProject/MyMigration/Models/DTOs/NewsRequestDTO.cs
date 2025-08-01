using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class NewsRequestDTO
    {
        // public Guid NewsId { get; set; }=Guid.NewGuid();
        // public Nullable<Guid> UserId { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Image { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid Status { get; set; }

    }
}
