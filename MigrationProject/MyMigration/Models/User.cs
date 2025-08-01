using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class User
    {
         public Guid UserId { get; set; }=Guid.NewGuid();
        public string Username { get; set; }
        public byte[] Password { get; set; }
        public virtual ICollection<News> News { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}