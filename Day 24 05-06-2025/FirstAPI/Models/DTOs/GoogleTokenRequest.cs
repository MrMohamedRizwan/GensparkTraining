using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class GoogleTokenRequest
    {
        public string IdToken { get; set; } = string.Empty;
    }
}