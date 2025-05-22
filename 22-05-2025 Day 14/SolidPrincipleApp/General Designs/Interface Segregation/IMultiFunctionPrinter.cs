using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Interface_Segregation
{
    public interface IMultiFunctionPrinter
    {
        void Print();
        void Scan();
        void Fax();
    }

}
