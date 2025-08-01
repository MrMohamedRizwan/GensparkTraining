using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyMigration.Context;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Controllers
{
    [Route("/api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        public OrderController(IOrderService _orderService)
        {
            orderService = _orderService;
        }
        [HttpGet("orders")]
        public async Task<IActionResult> GetOrders(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var orders = await orderService.GetOrdersAsync(pageNumber, pageSize);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error fetching orders: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("orders/{id}")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            try
            {
                var order = await orderService.GetOrderByIdAsync(id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error fetching order by ID: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("orders")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto order)
        {
            if (order == null)
            {
                return BadRequest("Order cannot be null");
            }
            try
            {
                var result = await orderService.CreateOrderAsync(order);
                if (result)
                {
                    return Ok(new { message = "Order created successfully" });
                }
                return BadRequest("Failed to create order");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error creating order: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("orders/{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            try
            {
                var result = await orderService.DeleteOrderAsync(id);
                if (result)
                {
                    return Ok(result);
                }
                return NotFound("Order not found");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error deleting order: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPut("orders/{id}")]
        public async Task<IActionResult> UpdateOrder(Guid id, [FromBody] Order order)
        {
            if (order == null)
            {
                return BadRequest("Invalid order data");
            }
            try
            {
                var result = await orderService.UpdateOrderAsync(id, order);
                if (result)
                {
                    return Ok(result);
                }
                return NotFound("Order not found");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error updating order: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("export")]
        public async Task<IActionResult> ExportOrderListing()
        {
            try
            {
                var reportData = await orderService.ExportOrderListingAsync();
                if (reportData == null || reportData.Length == 0)
                {
                    return NotFound("No data to export");
                }
                return File(reportData, "application/pdf", "OrderReport.pdf");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error exporting order listing: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


    }
}