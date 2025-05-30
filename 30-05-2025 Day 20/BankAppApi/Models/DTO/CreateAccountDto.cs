using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAppApi.Models.DTO
{
    public class CreateAccountDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal InitialDeposit { get; set; }
    }
}