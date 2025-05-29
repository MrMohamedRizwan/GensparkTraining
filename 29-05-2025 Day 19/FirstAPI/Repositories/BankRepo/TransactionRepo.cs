using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Models.Bank;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Repositories.BankRepo
{
    public class TransactionRepo : Repository<int, Transaction>
    {
        public TransactionRepo(ClinicContext clinicContext) : base(clinicContext)
        {
        }

        public async override Task<Transaction> Get(int key)
        {
            var transation = await _clinicContext.Transactions.SingleOrDefaultAsync(p => p.Id == key);

            return transation ??throw new Exception("No doctor specialities with the given ID");
        }

        public override async Task<IEnumerable<Transaction>> GetAll()
        {
            var transaction = _clinicContext.Transactions;
            if (transaction.Count() == 0)
                throw new Exception("No doctor speciality in the database");
            return (await transaction.ToListAsync());
        }
    }
}