using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class News
    {
        public Guid NewsId { get; set; }=Guid.NewGuid();
        public Nullable<Guid> UserId { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Image { get; set; }
        public string Content { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<Guid> Status { get; set; }
    
        public virtual User User { get; set; }
    }
}