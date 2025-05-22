using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Bad_Design.Open_Closed_Responsibility
{
    public class PaymentService
    {
        public void makePayment(string method, double amount)
        {
            if(method=="credit card")
            {
                Console.WriteLine($"Processing Credit Card Payment amount:{amount}");
            }
            else if(method=="UPI")
            {
                Console.WriteLine($"Processing UPI amount:{amount}");
            }
            else if(method == "Apple Pay")
            {
                Console.WriteLine($"Processing Apple Pay amount:{amount}");
            }
        }
    }
}
