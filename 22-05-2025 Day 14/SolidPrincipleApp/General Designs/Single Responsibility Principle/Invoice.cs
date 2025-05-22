using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Bad_Design.Single_Responsibility_Principle
{
    public class Invoice
    {
        public int Id { get; set; }
        public double Amount { get; set; }

        public void calculteTax()
        {
            double tax = Amount*0.18;
        }
        public void Print()
        {
            Console.WriteLine($"Printing Invoice #{Id} with amount {Amount}");
        }
        public void eMail()
        {
            Console.WriteLine("mailing");
        }

    }
}
