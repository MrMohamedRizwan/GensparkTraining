using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.General_Designs.DI
{
    internal class Notification
    {
        private EmailService _emailService = new EmailService();  
        public void NotifyUser(string message)
        {
            _emailService.SendEmail(message);
        }
    }
}
