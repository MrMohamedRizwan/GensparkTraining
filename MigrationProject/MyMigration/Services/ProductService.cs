using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Interfaces;
using MyMigration.Models;


namespace MyMigration.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Guid, Product> _productRepository;
        private readonly IRepository<Guid, Category> _categoryRepository;
        private readonly IRepository<Guid, Color> _colorRepository;
        private readonly IRepository<Guid, Model> _modelRepository;
        public ProductService(IRepository<Guid, Product> productRepository,
            IRepository<Guid, Category> categoryRepository,
            IRepository<Guid, Color> colorRepository,
            IRepository<Guid, Model> modelRepository

                              )
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _colorRepository = colorRepository;
            _modelRepository = modelRepository;

        }
        public async Task<Product?> GetProductByIdAsync(Guid id)
        {
            return await _productRepository.Get(id);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(int page, int pageSize, Guid? categoryId)
        {
            return await _productRepository.GetAll();
        }
        public async Task<Product> AddProductAsync(ProductCreateDto dto, Guid userId)
        {
            // Validate required related entities
            if (dto.CategoryId != null)
            {
                var category = await _categoryRepository.Get(dto.CategoryId.Value);
                if (category == null)
                    throw new Exception("Invalid CategoryId");
            }

            if (dto.ColorId != null)
            {
                var color = await _colorRepository.Get(dto.ColorId.Value);
                if (color == null)
                    throw new Exception("Invalid ColorId");
            }

            // if (dto.ModelId != null)
            // {
            //     var model = await _modelRepository.Get(dto.ModelId.Value);
            //     if (model == null)
            //         throw new Exception("Invalid ModelId");
            // }
            var existinfproduct = dto.ProductName;
            var existingProduct = await _productRepository.GetAll();
            if (existingProduct.Any(p => p.ProductName.Equals(existinfproduct, StringComparison.OrdinalIgnoreCase)))
            {
                throw new Exception("Product with the same name already exists.");
            }

            var product = new Product
            {
                ProductId = Guid.NewGuid(),
                ProductName = dto.ProductName,
                Image = dto.Image,
                Price = dto.Price,
                UserId = userId, // from token
                CategoryId = dto.CategoryId,
                ColorId = dto.ColorId,
                // ModelId = dto.ModelId,
                StorageId = dto.StorageId,
                SellStartDate = dto.SellStartDate,
                SellEndDate = dto.SellEndDate,
                IsNew = dto.IsNew
            };

            await _productRepository.Add(product);
            return product;
        }

        public async Task<Product?> UpdateProductAsync(Guid id, ProductCreateDto updatedProduct)
        {
            var existing = await _productRepository.Get(id);
            if (existing == null) return null;

            existing.ProductName = updatedProduct.ProductName;
            existing.Image = updatedProduct.Image;
            existing.Price = updatedProduct.Price;
            existing.CategoryId = updatedProduct.CategoryId;
            existing.ColorId = updatedProduct.ColorId;
            existing.ModelId = updatedProduct.ModelId;
            existing.StorageId = updatedProduct.StorageId;
            existing.SellStartDate = updatedProduct.SellStartDate;
            existing.SellEndDate = updatedProduct.SellEndDate;
            existing.IsNew = updatedProduct.IsNew;

            await _productRepository.Update(id, existing);
            return existing;
        }
        public async Task<bool> DeleteProductAsync(Guid id)
        {
            var existing = await _productRepository.Get(id);
            if (existing == null) return false;

            await _productRepository.Delete(id);
            return true;
        }

        
    }
}