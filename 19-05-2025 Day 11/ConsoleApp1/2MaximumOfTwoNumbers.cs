using System;

namespace MaximumOfTwoNumbers
{
    public class Task2
	{
        static int Maximum(int a, int b)
        {
            return a >= b ? a : b;
        }
        public static void MaximumOfTwo()
        {
            Console.WriteLine("Enter Two Numbers");
            int a = Convert.ToInt32(Console.ReadLine());
            int b = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("The Maximum of Two numbers is "+Maximum(a, b));
        }

    }

}
