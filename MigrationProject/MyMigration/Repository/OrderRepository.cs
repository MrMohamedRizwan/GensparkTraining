using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;

namespace MyMigration.Repository
{
    public class OrderRepository : Repository<Guid, Order>
    {
        public OrderRepository(MigrationContext context):base(context)
        {
            
        }
        public override async Task<Order> Get(Guid key)
        {
            return await _context.Orders.SingleOrDefaultAsync(u => u.OrderID == key);
        }

        public override async Task<IEnumerable<Order>> GetAll()
        {
            return await _context.Orders.ToListAsync();
        }
        
    }
}