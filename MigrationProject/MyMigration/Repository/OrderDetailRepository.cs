using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class OrderDetailRepository:Repository<Guid,OrderDetail>
    {
        public OrderDetailRepository(MigrationContext context) : base(context)
        {
        }

        public override async Task<OrderDetail> Get(Guid key)
        {
            return await _context.OrderDetails.SingleOrDefaultAsync(u => u.OrderID == key);
        }

        public override async Task<IEnumerable<OrderDetail>> GetAll()
        {
            return await _context.OrderDetails.ToListAsync();
        }
    }
    
}