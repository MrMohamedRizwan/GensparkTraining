using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Interface;
using BankAppApi.Models.DTO;
using BankAppApi.Repositories;
using FirstAPI.Models.Bank;

namespace BankAppApi.Services
{
    public class AccountService : IAccountService
    {
        private readonly AccountRepo _accountRepo;

        public AccountService(AccountRepo accountRepo)
        {
            _accountRepo = accountRepo;
        }

        public async Task<AccountDto> CreateAccount(CreateAccountDto dto)
        {
            var account = new Account
            {
                HName = dto.Name,
                Balance = dto.InitialDeposit
            };
            var created = await _accountRepo.Add(account);
            var acc= MapToDto(created);
            return acc;
        }

        public async Task<AccountDto> GetAccount(int id)
        {
            var account = await _accountRepo.Get(id);
            var acc= MapToDto(account);
            return acc;
        }

        public async Task<IEnumerable<AccountDto>> GetAllAccounts()
        {
            var accounts = await _accountRepo.GetAll();
            var acc= accounts.Select(MapToDto);
            return acc;
        }

        private AccountDto MapToDto(Account account) => new()
        {
            Id = account.Id,
            Name = account.HName,
            Balance = account.Balance
        };
    }
}