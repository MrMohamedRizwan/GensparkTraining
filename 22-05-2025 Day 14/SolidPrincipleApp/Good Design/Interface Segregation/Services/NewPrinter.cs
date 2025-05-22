using SolidPrincipleApp.Good_Design.Interface_Segregation.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Interface_Segregation.Services
{
    public class NewPrinter : IPrinter, IScanner, IFax
    {
        public void Print()
        {
            Console.WriteLine("Printing document...");
        }

        public void Scan()
        {
            Console.WriteLine("Scanning document...");
        }

        public void Fax()
        {
            Console.WriteLine("Faxing document...");
        }
    
    }
}
