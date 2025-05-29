using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models.Bank;
using FirstAPI.Models.DTOs;


namespace FirstAPI.Interfaces
{
    public interface IAccountService
    {
        public Task<Account> AddAccount(AccountAddRequest account);
        public Task<Account> GetAccountById(int id);
        void UpdateBalance(int accountId, decimal newBalance);
    }
}