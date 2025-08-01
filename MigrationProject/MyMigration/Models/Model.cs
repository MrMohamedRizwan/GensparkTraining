using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class Model
    {
        public Guid ModelId { get; set; }=Guid.NewGuid();
        public string Model1 { get; set; }
    
        public  ICollection<Product> Products { get; set; }
    }
}