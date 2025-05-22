using SolidPrincipleApp.Good_Design.Interface_Segregation.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Interface_Segregation.Services
{
    public class OldPrinter : IPrinter
    {
        public void Print()
        {
            Console.WriteLine("Printing document...");
        }
    }

}
