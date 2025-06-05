using System.ComponentModel.DataAnnotations;

namespace FirstAPI.Models
{


    public class User
    {
        [Key]
        public string email { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public byte[]? Password { get; set; }

        public byte[]? HashKey { get; set; }

    }
}