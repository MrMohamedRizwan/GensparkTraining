using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class Color
    {
        public Guid ColorId { get; set; } = Guid.NewGuid();
        public string Color1 { get; set; }
        public ICollection<Product> Products { get; set; }
    }
    
}