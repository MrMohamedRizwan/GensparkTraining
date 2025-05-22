using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Single_Responsibility_Principle
{
    public class InvoiceEmail
    {
        public void email(Invoice invoice)
        {
            Console.WriteLine($"Emailing to Customer {invoice.Id}");
        }
    }
}
