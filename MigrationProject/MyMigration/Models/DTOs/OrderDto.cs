using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class OrderDto
    {
        public Guid OrderID { get; set; }
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string PaymentType { get; set; }
        public string Status { get; set; }

        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAddress { get; set; }

        public List<OrderDetailDto> OrderDetails { get; set; }
    }
    public class OrderDetailDto
    {
        public Guid ProductID { get; set; }
        public string ProductName { get; set; }  // Optional
        public double? Price { get; set; }
        public int? Quantity { get; set; }
    }

}