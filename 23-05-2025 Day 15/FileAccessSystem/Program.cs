using FileAccessSystem.Interfaces;
using FileAccessSystem.Models;
using FileAccessSystem.Proxy;
using FileAccessSystem.Services;

class Program
{
    public static void Main(string[] args)
    {
        //Users u = new Users();
        //u.TakeEmployeeDetailsFromUser();

        //// Create proxy and access file
        //IFile fileProxy = new Proxy(u);
        //fileProxy.Read();





        List<Users> users = new List<Users>();

        bool flag = true;
        while(flag)
        {
            Console.WriteLine("1. Add Users");
            Console.WriteLine("2. Read File");
            Console.WriteLine("3. Exit");
            Console.Write("Enter your choice: ");

            string choice = Console.ReadLine();
            if(choice =="1")
            {
                Users u=new Users();
                u.TakeEmployeeDetailsFromUser();
                users.Add(u);
            }
            else if(choice =="2") 
            {
                Console.Write("Enter user name to read file: ");
                string inputName = Console.ReadLine();

                Console.Write("Enter role: ");
                string inputRole = Console.ReadLine();

                var foundUser = users.Find(u =>
                    u.Name.Equals(inputName, StringComparison.OrdinalIgnoreCase) &&
                    u.Role.Equals(inputRole, StringComparison.OrdinalIgnoreCase));

                if (foundUser == null)
                {
                    Console.WriteLine("User not found or role mismatch.");
                }
                else
                {
                    IFile proxy = new Proxy(foundUser);
                    proxy.Read();
                }
            }
            else if (choice =="3") 
            {
                foreach(var u in users)
                    Console.WriteLine($"{u.Id} Name: {u.Name} Role: {u.Role}");
                flag = false;
                break;
            }
            else
                Console.WriteLine("Invalid Input");

        }
        Console.WriteLine("\nPress any key to exit...");
        Console.ReadKey();
    }
}