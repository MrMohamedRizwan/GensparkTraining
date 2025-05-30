using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.context;
using FirstAPI.Models.Bank;
using Microsoft.EntityFrameworkCore;

namespace BankAppApi.Repositories
{
    public class AccountRepo : Repository<int, Account>
    {
        public AccountRepo(BankContext bankContext) : base(bankContext)
        {
        }

        public override async Task<Account> Get(int key)
        {
            var doctor = await _bankContext.Accounts.SingleOrDefaultAsync(d => d.Id == key);
            return doctor ?? throw new Exception("No Accounts with the given ID");
        }

        public override async Task<IEnumerable<Account>> GetAll()
        {
            var doctor = _bankContext.Accounts;
            if (doctor.Count() == 0)
               throw new Exception("No Accounts in the database");
            return (await doctor.ToListAsync());
        }
    }
}