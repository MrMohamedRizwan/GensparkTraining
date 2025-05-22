using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Interface_Segregation
{
    public class OldPrinter : IMultiFunctionPrinter
    {
        public void Print()
        {
            Console.WriteLine("Printing document...");
        }

        public void Scan()
        {
            throw new NotImplementedException(); // Old printer can't scan
        }

        public void Fax()
        {
            throw new NotImplementedException(); // Old printer can't fax
        }
    }

}
