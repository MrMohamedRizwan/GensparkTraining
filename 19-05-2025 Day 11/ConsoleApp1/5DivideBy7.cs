using System;
namespace DivideBy7
{
	public class Task5
	{
		public static void divideBy7()
		{
            for (int i = 0; i < 10; i++)
            {
                int x = Convert.ToInt32(Console.ReadLine());
                if (x % 7 == 0)
                    Console.WriteLine(x);
            }
        }
	}
}
