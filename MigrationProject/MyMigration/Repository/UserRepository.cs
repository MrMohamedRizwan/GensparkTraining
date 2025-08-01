using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class UserRepository : Repository<Guid, User>
    {
        public UserRepository(MigrationContext context) : base(context)
        {
        }

        public override async Task<User> Get(Guid key)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.UserId == key);
            
        }

        public override async Task<IEnumerable<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }
    }
}