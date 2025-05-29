using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAppApi.Models.DTO
{
    public class TransactionDto
    {
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
    }
}