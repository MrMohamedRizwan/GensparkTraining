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
    public class TransactionService : ITransactionService
    {
        private readonly TrasactionRepo _transactionRepo;
        private readonly AccountRepo _accountRepo;

        public TransactionService(TrasactionRepo transactionRepo, AccountRepo accountRepo)
        {
            _transactionRepo = transactionRepo;
            _accountRepo = accountRepo;
        }

        public async Task<TransactionDto> PerformTransaction(TransactionDto dto)
        {
            var account = await _accountRepo.Get(dto.AccountId);
            if (account == null)
                throw new Exception("Account not found.");

            if (dto.Type.ToLower() == "withdraw")
            {
                if (account.Balance < dto.Amount)
                    throw new Exception("Insufficient balance.");
                account.Balance -= dto.Amount;
            }
            else if (dto.Type.ToLower() == "deposit")
            {
                account.Balance += dto.Amount;
            }
            else
            {
                throw new Exception("Invalid transaction type.");
            }

            await _accountRepo.Update(account.Id, account);

            var transaction = new Transaction
            {
                AccountId = dto.AccountId,
                Amount = dto.Amount,
                Type = dto.Type,
                Date = DateTime.UtcNow
            };

            var createdTransaction = await _transactionRepo.Add(transaction);

            var transact= new TransactionDto
            {
                AccountId = createdTransaction.AccountId,
                Amount = createdTransaction.Amount,
                Type = createdTransaction.Type
            };
            return transact;
        }

        public async Task<IEnumerable<TransactionDto>> GetAllTransactions()
        {
            var transactions = await _transactionRepo.GetAll();
            var transact= transactions.Select(t => new TransactionDto
            {
                AccountId = t.AccountId,
                Amount = t.Amount,
                Type = t.Type
            });
            return transact;
        }
    }
}