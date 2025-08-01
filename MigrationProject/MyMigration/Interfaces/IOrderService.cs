using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetOrdersAsync(int pageNumber, int pageSize);
        Task<OrderDto> GetOrderByIdAsync(Guid id);
        Task<byte[]> ExportOrderListingAsync();
        Task<bool> CreateOrderAsync(CreateOrderDto order);
        Task<bool> UpdateOrderAsync(Guid id, Order order);
        Task<bool> DeleteOrderAsync(Guid id);
    }
}