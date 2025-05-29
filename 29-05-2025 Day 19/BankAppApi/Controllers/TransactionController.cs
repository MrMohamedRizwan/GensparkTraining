using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Interface;
using BankAppApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BankAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> Transact(TransactionDto dto)
        {
            var result = await _transactionService.PerformTransaction(dto);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAll()
        {
            var transactions = await _transactionService.GetAllTransactions();
            return Ok(transactions);
        }
    }

}