using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.General_Designs.Liskov_Substitution_Principle
{
    public class Documents
    {
        public virtual void View()
        {
            Console.WriteLine("Viewing Document");
        }
        public virtual void Edit() 
        {
            Console.WriteLine("Edit"); 
        }
    }
}
