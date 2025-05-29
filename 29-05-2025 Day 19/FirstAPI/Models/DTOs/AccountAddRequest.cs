using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class AccountAddRequest
    {
        public string HolderName { get; set; } = string.Empty;
        public decimal Balance { get; set; }
    }
}