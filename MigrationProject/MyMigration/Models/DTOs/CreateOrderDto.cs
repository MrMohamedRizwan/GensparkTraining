using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class CreateOrderDto
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string PaymentType { get; set; }
        public string Status { get; set; }

        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAddress { get; set; }

        public List<CreateOrderDetailDto> OrderDetails { get; set; } = new();
    }

    public class CreateOrderDetailDto
    {
        public Guid ProductID { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
    }
}