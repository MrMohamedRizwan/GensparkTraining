using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class CategoryRepository : Repository<Guid, Category>
    {
        public CategoryRepository(MigrationContext context):base(context)
        {
            
        }
        public override async Task<Category> Get(Guid key)
        {
            return await _context.Categories.SingleOrDefaultAsync(u => u.CategoryId == key);
        }

        public override async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }
        
    }
}