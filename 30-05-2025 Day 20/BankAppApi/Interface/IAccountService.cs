using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Models.DTO;
using FirstAPI.Models.Bank;

namespace BankAppApi.Interface
{
    public interface IAccountService
    {
        Task<AccountDto> CreateAccount(CreateAccountDto dto);
        Task<AccountDto> GetAccount(int id);
        Task<IEnumerable<AccountDto>> GetAllAccounts();
    }
}