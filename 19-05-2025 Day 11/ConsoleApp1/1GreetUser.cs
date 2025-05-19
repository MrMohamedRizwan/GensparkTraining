using System;

namespace GreetUser
{
    public class Task1
    {
        // Static method
        public static void Greet()
        {
            Console.WriteLine("Enter Your Name");
            string? name = Console.ReadLine();
            if (!string.IsNullOrEmpty(name))
            {
                Console.WriteLine($"Hello {name}");
            }
            else
            {
                Console.WriteLine("Error");
            }
        }
    }
}
