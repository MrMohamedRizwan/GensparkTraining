using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class Category
    {
        public Guid CategoryId { get; set; }=Guid.NewGuid();
        public string Name { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}