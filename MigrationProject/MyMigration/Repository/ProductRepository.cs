using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Interfaces;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class ProductRepository:Repository<Guid,Product>
    {


        public ProductRepository(MigrationContext context):base(context)
        {
            
        }

        public override async Task<Product> Get(Guid key)
        {
            return await _context.Products.SingleOrDefaultAsync(u => u.ProductId == key);
        }

        public override async Task<IEnumerable<Product>> GetAll()
        {
            return await _context.Products.ToListAsync();
        }
    }
}