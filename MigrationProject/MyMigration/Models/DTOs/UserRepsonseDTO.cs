using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class UserRepsonseDTO
    {
        public Guid UserId { get; set; }=Guid.NewGuid();
        public string Username { get; set; }
        
    }
}