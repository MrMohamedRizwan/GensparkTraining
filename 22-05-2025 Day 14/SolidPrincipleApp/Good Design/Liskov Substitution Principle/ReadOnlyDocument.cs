using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Liskov_Substitution_Principle
{
    public class ReadOnlyDocument : Documents
    {
        public ReadOnlyDocument() 
        {
            View();
        }
    }
}
