using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models.Bank;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Interfaces
{
    public interface ITransactionService
    {
        public Task<Transaction> AddTransaction(Transaction transaction);
        public Task<Transaction> GetTransactionsByAccountId(int accountId);
    }
}