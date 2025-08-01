using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.IO;
using CrystalDecisions.CrystalReports.Engine;
using MyMigration.Context;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;
using MyMigration.Repository;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace MyMigration.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Guid,Order> _orderRepository;
        private readonly IRepository<Guid, OrderDetail> _orderDetailRepository;
        private readonly IRepository<Guid, Product> _productRepository;


        public OrderService(IRepository<Guid, Order> orderRepository,
                            IRepository<Guid, OrderDetail> orderDetailRepository,
                            IRepository<Guid, Product> productRepository)
        {
            
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
        }
        public async Task<bool> CreateOrderAsync(CreateOrderDto orderDto)
        {
            try
            {
                if (orderDto == null)
                {
                    throw new ArgumentNullException(nameof(orderDto), "Order data cannot be null");
                }

                // Basic validation
                if (string.IsNullOrEmpty(orderDto.CustomerName) || orderDto.OrderDate == default)
                {
                    throw new ArgumentException("Invalid order data");
                }

                // Step 1: Generate OrderID
                var orderId = Guid.NewGuid();

                // Step 2: Create Order object
                var order = new Order
                {
                    OrderID = orderId,
                    OrderName = orderDto.OrderName,
                    OrderDate = DateTime.UtcNow,
                    PaymentType = orderDto.PaymentType,
                    Status = orderDto.Status,
                    CustomerName = orderDto.CustomerName,
                    CustomerPhone = orderDto.CustomerPhone,
                    CustomerEmail = orderDto.CustomerEmail,
                    CustomerAddress = orderDto.CustomerAddress
                };

                // Step 3: Save order
                await _orderRepository.Add(order);

                // Step 4: Create order detail entities
                if (orderDto.OrderDetails != null && orderDto.OrderDetails.Any())
                {
                    var orderDetails = orderDto.OrderDetails.Select(od => new OrderDetail
                    {
                        // orde = Guid.NewGuid(),
                        OrderID = orderId,
                        ProductID = od.ProductID,
                        Quantity = od.Quantity,
                        Price = od.Price
                    }).ToList();

                    foreach (var detail in orderDetails)
                    {
                        await _orderDetailRepository.Add(detail);
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error creating order: {ex.Message}");
                return false;
            }
        }
  public async Task<bool> DeleteOrderAsync(Guid id)
        {
            try
            {
                // Attempt to delete the order by ID
                var deletedOrder = await _orderRepository.Delete(id);
                return deletedOrder != null;
            }
            catch (KeyNotFoundException)
            {
                Console.WriteLine($"Order with ID {id} not found for deletion");
                return false;
            }
            catch (Exception ex)
            {
                // Log any other exceptions
                Console.WriteLine($"Error deleting order: {ex.Message}");
                return false;
            }
            
        }

        // public async Task<byte[]> ExportOrderListingAsync()
        // {
        //     Console.WriteLine("\n\n\nExporting order listing to PDF...\n\n");
        //     var orders = await _orderRepository.GetAll();

        //     ReportDocument rd = new ReportDocument();
        //     string reportPath = Path.Combine(Directory.GetCurrentDirectory(), "MyReports", "OrderListing.rpt");

        //     if (!File.Exists(reportPath))
        //         throw new FileNotFoundException("Report file not found.", reportPath);

        //     rd.Load(reportPath);
        //     rd.SetDataSource(orders);

        //     using var stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //     using var ms = new MemoryStream();
        //     stream.CopyTo(ms);
        //     return ms.ToArray();
        // }

        

public async Task<byte[]> ExportOrderListingAsync()
{
        QuestPDF.Settings.License = LicenseType.Community; // Required

    var orders = await _orderRepository.GetAll();

    // Create PDF document
    var document = Document.Create(container =>
    {
        container.Page(page =>
        {
            page.Margin(30);
            page.Size(PageSizes.A4);
            page.PageColor(Colors.White);
            page.DefaultTextStyle(x => x.FontSize(12));

            page.Header().Text("Order Listing").SemiBold().FontSize(20).FontColor(Colors.Blue.Medium);

            page.Content().Table(table =>
            {
                // Define columns
                table.ColumnsDefinition(columns =>
                {
                    columns.ConstantColumn(50); // ID
                    columns.RelativeColumn(2);  // Name
                    columns.RelativeColumn(2);  // Phone
                    columns.RelativeColumn(3);  // Address
                    columns.RelativeColumn(2);  // Status
                });

                // Table header
                table.Header(header =>
                {
                    header.Cell().Element(CellStyle).Text("ID");
                    header.Cell().Element(CellStyle).Text("Customer Name");
                    header.Cell().Element(CellStyle).Text("Phone");
                    header.Cell().Element(CellStyle).Text("Address");
                    header.Cell().Element(CellStyle).Text("Status");

                    static IContainer CellStyle(IContainer container)
                    {
                        return container.DefaultTextStyle(x => x.SemiBold()).Padding(5).Background(Colors.Grey.Lighten2).BorderBottom(1).BorderColor(Colors.Black);
                    }
                });

                // Table rows
                foreach (var order in orders)
                {
                    table.Cell().Element(CellStyle).Text(order.OrderID.ToString());
                    table.Cell().Element(CellStyle).Text(order.CustomerName);
                    table.Cell().Element(CellStyle).Text(order.CustomerPhone);
                    table.Cell().Element(CellStyle).Text(order.CustomerAddress);
                    table.Cell().Element(CellStyle).Text(order.Status);

                    static IContainer CellStyle(IContainer container)
                    {
                        return container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).Padding(5);
                    }
                }
            });

            page.Footer().AlignCenter().Text(x =>
            {
                x.Span("Generated on ");
                x.Span(DateTime.Now.ToString("dd MMM yyyy HH:mm")).SemiBold();
            });
        });
    });

    using var ms = new MemoryStream();
    document.GeneratePdf(ms);
    return ms.ToArray();
}


        public async Task<OrderDto> GetOrderByIdAsync(Guid id)
        {
            try
            {
                var order = await _orderRepository.Get(id);
                if (order == null)
                    throw new KeyNotFoundException($"Order with ID {id} not found");

                // Manual mapping to DTO
                // Fetch order details from the repository
                var orderDetails = await _orderDetailRepository.GetAll();
                var filteredOrderDetails = orderDetails
                    .Where(od => od.OrderID == order.OrderID)
                    .ToList();

                // Assuming you have a product repository injected, e.g.:
                // private readonly IRepository<Guid, Product> _productRepository;

                // Fetch all products to map ProductID to ProductName
                // (Consider optimizing this if you have a large product set)
                var allProducts = (await _productRepository.GetAll()).Select(p => new
                {
                    p.ProductId,
                    p.ProductName
                }).ToList();

                var orderDto = new OrderDto
                {
                    OrderID = order.OrderID,
                    OrderName = order.OrderName,
                    OrderDate = order.OrderDate,
                    PaymentType = order.PaymentType,
                    Status = order.Status,
                    CustomerName = order.CustomerName,
                    CustomerPhone = order.CustomerPhone,
                    CustomerEmail = order.CustomerEmail,
                    CustomerAddress = order.CustomerAddress,
                    OrderDetails = filteredOrderDetails.Any()
                        ? filteredOrderDetails.Select(od => new OrderDetailDto
                        {
                            ProductID = od.ProductID,
                            ProductName = allProducts.FirstOrDefault(p => p.ProductId == od.ProductID)?.ProductName,
                            Price = od.Price,
                            Quantity = od.Quantity
                        }).ToList()
                        : new List<OrderDetailDto>()
                };

                return orderDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching order by ID: {ex.Message}");
                return null;
            }
        }


        public async Task<IEnumerable<Order>> GetOrdersAsync(int pageNumber, int pageSize)
        {
            try
            {
                // Fetch all orders from the repository
                var orders = await _orderRepository.GetAll();


                // Apply pagination
                var paginatedOrders = orders.Skip((pageNumber - 1) * pageSize).Take(pageSize);

                return paginatedOrders;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error fetching orders: {ex.Message}");
                return Enumerable.Empty<Order>();
            }
        }

        public async Task<bool> UpdateOrderAsync(Guid id, Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order), "Order cannot be null");
            }

            try
            {
                // Validate order properties if necessary
                if (string.IsNullOrEmpty(order.CustomerName) || order.OrderDate == default)
                {
                    throw new ArgumentException("Invalid order data");
                }

                // Update the order in the repository
                var updatedOrder = await _orderRepository.Update(id, order);
                return updatedOrder != null;
            }
            catch (KeyNotFoundException)
            {
                Console.WriteLine($"Order with ID {id} not found for update");
                return false;
            }
            catch (Exception ex)
            {
                // Log any other exceptions
                Console.WriteLine($"Error updating order: {ex.Message}");
                return false;
            }
        
            
        }
    }
}