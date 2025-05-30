using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.Bank
{
    public class Account
    {
        public int Id { get; set; }
        public string HName { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public ICollection<Transaction>? Transactions { get; set; }
    }
}