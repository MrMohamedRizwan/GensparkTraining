using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Single_Responsibility_Principle
{
    public class InvoicePrinter
    {
        public void Print(Invoice invoice)
        {
            Console.WriteLine($"Printing Invoice #{invoice.Id} with amount {invoice.Amount}");
        }
    }
}
