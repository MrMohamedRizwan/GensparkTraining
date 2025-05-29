using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Interfaces;
using FirstAPI.Misc;
using FirstAPI.Models.Bank;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class AccountService : IAccountService
    {
        AccountMapper accountMapper;
        private readonly ClinicContext _clinicContext;
        private readonly IRepository<int, Account> _accountRepository;

        public AccountService(ClinicContext clinicContext,IRepository<int, Account> accountRepository)
        {
            accountMapper = new AccountMapper();
            _accountRepository = accountRepository;
            _clinicContext = clinicContext;
        }
        public async Task<Account> AddAccount(AccountAddRequest account)
        {
            using var transaction = await _clinicContext.Database.BeginTransactionAsync();
            var newAccount = accountMapper.MapAccountAddRequestAccount(account);
            try
            {
                await _clinicContext.AddAsync(newAccount);
                await _clinicContext.SaveChangesAsync();
                newAccount = await _accountRepository.Add(newAccount);
                await _clinicContext.SaveChangesAsync();

                await transaction.CommitAsync();

                return newAccount;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public Task<Account> GetAccountById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateBalance(int accountId, decimal newBalance)
        {
            throw new NotImplementedException();
        }
    }
}