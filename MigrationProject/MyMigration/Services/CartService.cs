using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Extensions;
using MyMigration.Models.DTOs;

namespace MyMigration.Services
{
    public class CartService : ICartService
    {
        private const string CartSessionKey = "Cart";

        private readonly IRepository<Guid, Product> _productRepository;
        private readonly IRepository<Guid, Order> _orderRepository;
        private readonly IRepository<Guid, OrderDetail> _orderDetailRepository;

        public CartService(IRepository<Guid, Product> productRepository, IRepository<Guid, Order> orderRepository, IRepository<Guid, OrderDetail> orderDetailRepository)
        {
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
        }
        public async  Task AddToCart(HttpContext httpContext, Guid productId)
        {
            var cart = GetCart(httpContext);
            var existingCartItem = cart.FirstOrDefault(c => c.ProductId == productId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity++;
                Console.WriteLine($"Product with ID: {productId} already exists in cart. Incrementing quantity to {existingCartItem.Quantity}");
            }
            else
            {
                Console.WriteLine($"Adding product with ID: {productId} to cart");
                var product = await _productRepository.Get(productId);

                if (product == null)
                {
                    throw new Exception($"Product with ID {productId} not found.");
                }
                Console.WriteLine($"Product found: {product.ProductName}, Price: {product.Price}");

                cart.Add(new CartResponsDTO
                {
                    ProductId = product.ProductId,
                    Quantity = 1
                });
            }
            // context.Session.SetObjectAsJson(CartSessionKey, cart);
            await SaveCart(httpContext, cart);
        }

        public async Task RemoveFromCart(HttpContext context, Guid productId)
        {
            var cart = GetCart(context);
            cart.RemoveAll(c => c.ProductId == productId);
            context.Session.SetObjectAsJson(CartSessionKey, cart);
        }

        public async Task UpdateCart(HttpContext httpContext, List<int> quantities)
        {
            var cart = GetCart(httpContext);
            for (int i = 0; i < cart.Count && i < quantities.Count; i++)
            {
                cart[i].Quantity = quantities[i];
            }
            SaveCart(httpContext, cart);
        }

        public async Task ClearCart(HttpContext httpContext)
        {
            httpContext.Session.Remove(CartSessionKey);
        }

        public List<CartResponsDTO> GetCart(HttpContext httpContext)
        {
            // return httpContext.Session.GetObjectFromJson<List<Cart>>(CartSessionKey) ?? new List<Cart>();
            return httpContext.Session.GetObjectFromJson<List<CartResponsDTO>>(CartSessionKey) ?? new List<CartResponsDTO>();

        }

        private async Task SaveCart(HttpContext context, List<CartResponsDTO> cart)
        {
            context.Session.SetObjectAsJson(CartSessionKey, cart);
        }


        public async Task<bool> ProcessOrderAsync(HttpContext httpContext, ProcessOrderDTO orderDto)
        {
            try
            {
                var order = new Order
                {
                    OrderID = Guid.NewGuid(),
                    CustomerName = orderDto.CustomerName,
                    CustomerPhone = orderDto.CustomerPhone,
                    CustomerEmail = orderDto.CustomerEmail,
                    CustomerAddress = orderDto.CustomerAddress,
                    OrderDate = DateTime.UtcNow,
                    PaymentType = "Cash",
                    Status = "Processing"
                };

                var savedOrder = await _orderRepository.Add(order);

                foreach (var item in orderDto.CartItems)
                {
                    var detail = new OrderDetail
                    {
                        OrderID = order.OrderID,
                        // ProductID = item.ProductID,
                        Quantity = item.Quantity,
                        // Price = item.Price
                    };
                    await _orderDetailRepository.Add(detail);
                }

                return savedOrder != null;
            }
            catch
            {
                return false;
            }
        }

        // public async Task ProcessOrderAsync(HttpContext context, CheckoutDto dto)
        // {
        //     var cart = GetCart(context);

        //     var order = new Order
        //     {
        //         OrderID = Guid.NewGuid(),
        //         CustomerName = dto.CustomerName,
        //         CustomerPhone = dto.CustomerPhone,
        //         CustomerEmail = dto.CustomerEmail,
        //         CustomerAddress = dto.CustomerAddress,
        //         OrderDate = DateTime.UtcNow,
        //         PaymentType = "Cash",
        //         Status = "Processing"
        //     };

        //     await _orderRepository.Add(order);

        //     foreach (var item in cart)
        //     {
        //         var orderDetail = new OrderDetail
        //         {
        //             OrderID = order.OrderID,
        //             ProductID = item.Product.ProductId,
        //             Quantity = item.Quantity,
        //             Price = item.Product.Price
        //         };

        //         await _orderDetailRepository.Add(orderDetail);
        //     }

        //     context.Session.Remove(CartSessionKey);
        // }


    }
}
