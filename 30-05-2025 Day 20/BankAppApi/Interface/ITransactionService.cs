using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Models.DTO;
using FirstAPI.Models.Bank;

namespace BankAppApi.Interface
{
    public interface ITransactionService
    {
        Task<TransactionDto> PerformTransaction(TransactionDto dto);
        Task<IEnumerable<TransactionDto>> GetAllTransactions();
    }
}