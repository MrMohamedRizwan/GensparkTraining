using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class ContactU
    {
        public Guid id { get; set; }=Guid.NewGuid();
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string content { get; set; }
    }
}