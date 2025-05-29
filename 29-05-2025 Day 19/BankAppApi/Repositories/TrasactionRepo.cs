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
            var doctor = await _bankContext.Transactions.SingleOrDefaultAsync(d => d.Id == key);
            return doctor ?? throw new Exception("No Doctor with the given ID");
        }

        public override async Task<IEnumerable<Transaction>> GetAll()
        {
            var doctor = _bankContext.Transactions;
            if (doctor.Count() == 0)
               throw new Exception("No Patients in the database");
            return (await doctor.ToListAsync());
        }
    }
}