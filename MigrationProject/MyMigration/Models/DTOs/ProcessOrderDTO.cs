using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class ProcessOrderDTO
    {
          public string CustomerName { get; set; }
    public string CustomerPhone { get; set; }
    public string CustomerEmail { get; set; }
    public string CustomerAddress { get; set; }
    public List<CartItemDto> CartItems { get; set; }
}

public class CartItemDto
{
    public int ProductID { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
}