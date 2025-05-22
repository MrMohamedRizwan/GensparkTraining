using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Single_Responsibility_Principle
{
    public class InvoiceCalculator
    {
        public double CalculateTax(Invoice invoice)
        {
            return invoice.Amount * 0.18;
        }
    }
}
