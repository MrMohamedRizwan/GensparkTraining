using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface ICartService
    {
        List<CartResponsDTO> GetCart(HttpContext httpContext);
        Task AddToCart(HttpContext httpContext, Guid productId);
        Task UpdateCart(HttpContext httpContext, List<int> quantities);
        Task RemoveFromCart(HttpContext httpContext, Guid productId);
        Task ClearCart(HttpContext httpContext);
        Task<bool> ProcessOrderAsync(HttpContext httpContext, ProcessOrderDTO dto);

        
    }
}