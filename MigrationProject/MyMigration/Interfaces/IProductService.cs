using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models;

namespace MyMigration.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProductsAsync(int page, int pageSize, Guid? categoryId);
        Task<Product?> GetProductByIdAsync(Guid id);
        Task<Product> AddProductAsync(ProductCreateDto dto, Guid userId);
        Task<Product?> UpdateProductAsync(Guid id, ProductCreateDto updatedProduct);
        Task<bool> DeleteProductAsync(Guid id);
    }
}
