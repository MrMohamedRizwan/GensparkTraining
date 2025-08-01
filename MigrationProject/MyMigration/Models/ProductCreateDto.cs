using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class ProductCreateDto
    {
        public string ProductName { get; set; } = string.Empty;
        public string? Image { get; set; }
        public double? Price { get; set; }
        public Guid? UserId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? ColorId { get; set; }
        public Guid? ModelId { get; set; }
        public Guid? StorageId { get; set; }
        public DateTime? SellStartDate { get; set; }
        public DateTime? SellEndDate { get; set; }
        public int? IsNew { get; set; }
    }
}