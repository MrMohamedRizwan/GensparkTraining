using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class ColorRepository:Repository<Guid,Color>
    {
        public ColorRepository(MigrationContext context):base(context)
        {
            
        }
        public override async Task<Color> Get(Guid key)
        {
            return await _context.Colors.SingleOrDefaultAsync(u => u.ColorId == key);
        }

        public override async Task<IEnumerable<Color>> GetAll()
        {
            return await _context.Colors.ToListAsync();
        }
        
    }
}