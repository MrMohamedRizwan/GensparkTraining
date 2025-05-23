using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileAccessSystem.Models
{
    public class Users
    {
        private static int idctr=1;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public Users() 
        {
            Id = idctr++;
            Name = string.Empty;
            Role = "Guest";
        }
        public Users(string role, string name)
        {
            Id = idctr++;
            Name = name;
            Role = role;
        }
        public void TakeEmployeeDetailsFromUser()
        {
            Console.WriteLine("Please enter the User name");
            Name = Console.ReadLine() ?? "";
            Console.WriteLine("Please enter the User Role");
            Role = Console.ReadLine() ??"Guest";
        }
    }
}
