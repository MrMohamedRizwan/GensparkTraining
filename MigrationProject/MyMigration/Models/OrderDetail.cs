using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models
{
    public class OrderDetail
    {
        public Guid OrderID { get; set; }=Guid.NewGuid();

        // [Key, Column(Order = 1)]
        public Guid ProductID { get; set; }

        public double? Price { get; set; }
        public int? Quantity { get; set; }

        // [ForeignKey(nameof(OrderID))]
        public  Order Order { get; set; }

        // [ForeignKey(nameof(ProductID))]
        public virtual Product Product { get; set; }
    }
}