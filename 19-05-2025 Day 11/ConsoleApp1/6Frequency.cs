using System;
namespace FrequencyOfEachElement
{
	public class Task6
	{
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out  number))
                Console.WriteLine("Invalid Input Please try again");
            return Convert.ToInt32(number);
        }
		public static void Frequency()
		{
            Console.WriteLine("Enter the number of elements:");
            int n = GetNumbersFromUser();
            int[] numbers = new int[n];
            Console.WriteLine("Enter the numbers");
            for (int i = 0; i < n; i++)
            {
                numbers[i] = GetNumbersFromUser();
            }

            Dictionary<int, int> frequency = new Dictionary<int, int>();
            foreach (int num in numbers)
            {
                if (frequency.ContainsKey(num))
                {
                    frequency[num]++;
                }
                else
                {
                    frequency[num] = 1;
                }
            }
            Console.WriteLine("\nFrequency of each element:");
            foreach (var pair in frequency)
            {
                Console.WriteLine($"Number {pair.Key} occurs {pair.Value} time(s).");
            }

        }
    }
}

