using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyMigration.Interfaces;
using MyMigration.Models.DTOs;

namespace MyMigration.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public ShoppingCartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public IActionResult GetCart()
        {
            var cart = _cartService.GetCart(HttpContext);
            return Ok(cart);
        }

        [HttpPost("{productId}")]
        public async Task<IActionResult> AddToCart(Guid productId)
        {
            await _cartService.AddToCart(HttpContext, productId);
            return Ok();
        }

        [HttpDelete("{productId}")]
        public IActionResult RemoveFromCart(Guid productId)
        {
            _cartService.RemoveFromCart(HttpContext, productId);
            return Ok();
        }

        [HttpPut("update")]
        public IActionResult UpdateCart([FromBody] List<int> quantities)
        {
            _cartService.UpdateCart(HttpContext, quantities);
            return Ok();
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] ProcessOrderDTO dto)
        {
            // if (dto == null || dto.CartItems == null || !dto.CartItems.Any())
            // {
            //     return BadRequest("Invalid order data.");
            // }

            await _cartService.ProcessOrderAsync(HttpContext, dto);

            return Ok(new { Message = "Order placed successfully." });
        
        }
    }
}