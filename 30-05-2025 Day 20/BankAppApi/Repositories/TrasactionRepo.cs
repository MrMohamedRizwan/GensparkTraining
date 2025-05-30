using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.context;
using FirstAPI.Models.Bank;
using Microsoft.EntityFrameworkCore;

namespace BankAppApi.Repositories
{
    public class TrasactionRepo: Repository<int, Transaction>
    {
        public TrasactionRepo(BankContext bankContext) : base(bankContext)
        {

        }

        public override async Task<Transaction> Get(int key)
        {
            var transact = await _bankContext.Transactions.SingleOrDefaultAsync(d => d.Id == key);
            return transact ?? throw new Exception("No Transaction with the given ID");
        }

        public override async Task<IEnumerable<Transaction>> GetAll()
        {
            var transact = _bankContext.Transactions;
            if (transact.Count() == 0)
               throw new Exception("No Transactions in the database");
            return (await transact.ToListAsync());
        }
    }
}