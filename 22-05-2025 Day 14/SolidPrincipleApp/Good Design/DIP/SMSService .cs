using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.DIP
{
    public class SMSService : IMessageService
    {
        public void SendMessage(string message)
        {
            Console.WriteLine("Sending SMS: " + message);
        }
    }

}
