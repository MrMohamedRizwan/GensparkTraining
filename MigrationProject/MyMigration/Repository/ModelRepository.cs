using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class ModelRepository:Repository<Guid, Model>
    {
        public ModelRepository(MigrationContext context) : base(context)
        {
        }

        public override async Task<Model> Get(Guid key)
        {
            return await _context.Models.SingleOrDefaultAsync(m => m.ModelId == key);
        }

        public override async Task<IEnumerable<Model>> GetAll()
        {
            return await _context.Models.ToListAsync();
        }
    }
    
}