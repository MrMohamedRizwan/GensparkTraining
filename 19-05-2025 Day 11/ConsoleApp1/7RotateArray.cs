using System;

namespace RotateArray
{
    public class Task7
    {
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out number))
                Console.WriteLine("Invalid Input Please try again");
            return Convert.ToInt32(number);
        }
        public static void RotateArray()
        {
            Console.WriteLine("Enter the number of elements:");
            int n = GetNumbersFromUser();
            int[] numbers = new int[n];
            Console.WriteLine("Enter the numbers");
            for (int i = 0; i < n; i++)
            {
                numbers[i] = GetNumbersFromUser();
            }

            int fv = numbers[0];
            for (int i = 0; i < n - 1; i++)
            {
                numbers[i] = numbers[i + 1];
            }
            numbers[n - 1] = fv;
            foreach (int i in numbers)
                Console.Write(i+ " ");
        }
    }
}
