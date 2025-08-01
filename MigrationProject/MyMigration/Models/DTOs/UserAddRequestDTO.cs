using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class UserAddRequestDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}