using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.General_Designs.DI
{
    public class EmailService
    {
        public void SendEmail(string message)
        {
            Console.WriteLine("Sending email: " + message);
        }
    }
}
