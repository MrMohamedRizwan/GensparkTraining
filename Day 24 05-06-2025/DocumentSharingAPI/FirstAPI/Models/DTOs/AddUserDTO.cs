using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class AddUserDTO
    {
        public string email { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Password { get; set; }
    }
}