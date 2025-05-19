using System;
namespace UsernamePassword
{
	public class Task4
	{
		public static void CheckUsernamePwd()
		{
            int i = 1;
            while (i <= 3)
            {
                Console.WriteLine("Enter Username and Password");
                string? userName = Console.ReadLine();
                string? password = Console.ReadLine();

                if (userName == "Admin" && password == "pass")
                {
                    Console.WriteLine("Success!!");
                    return;
                }
                Console.WriteLine($"Remaining Attempt {3 - i}");
                i++;
            }
            Console.WriteLine("Invalid attempts for 3 times. Exiting....");

        }
	}
}
