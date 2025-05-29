using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Models.Bank;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Repositories.BankRepo
{
    public class AccountRepo : Repository<int, Account>
    {
        public AccountRepo(ClinicContext clinicContext) : base(clinicContext)
        {
        }

        public override async Task<Account> Get(int key)
        {
            var acc = await _clinicContext.Accounts.SingleOrDefaultAsync(p => p.Id == key);

            return acc ??throw new Exception("No doctor specialities with the given ID");
        }

        public override async Task<IEnumerable<Account>> GetAll()
        {
            var acc = _clinicContext.Accounts;
            if (acc.Count() == 0)
                throw new Exception("No doctor speciality in the database");
            return (await acc.ToListAsync());
        }
    }
}