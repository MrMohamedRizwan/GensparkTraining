using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace SolidPrincipleApp.Good_Design.Liskov_Substitution_Principle
{
    public class EditableDocument : Documents, IEditable
    {
        public virtual void Edit()
        {
            Console.WriteLine("Editing document");
        }
    }
}
