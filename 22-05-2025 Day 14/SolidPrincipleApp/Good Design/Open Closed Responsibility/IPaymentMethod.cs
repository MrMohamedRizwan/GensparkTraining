using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Open_Closed_Responsibility
{
    public interface IPaymentMethod
    {
        void ProcessPayment(decimal amount);
    }
}
