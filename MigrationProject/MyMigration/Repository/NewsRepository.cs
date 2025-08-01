using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class NewsRepository : Repository<Guid, News>
    {
        public NewsRepository(MigrationContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<News>> GetAll()
        {
            return await _context.News.ToListAsync();
        }

        public override async Task<News?> Get(Guid id)
        {
            return await _context.News.FindAsync(id);
        }

        
    }
}