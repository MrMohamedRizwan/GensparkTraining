using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.General_Designs.Liskov_Substitution_Principle
{
    public class ReadOnlyDocument : Documents
    {
        public ReadOnlyDocument() 
        {
            View();
        }
        public override void Edit()
        {
            throw new InvalidOperationException("Read Only document cannot be edited");
        }
    }
}
