using System;

namespace MergeIntoSingleArray
{
	public class Task8
	{
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out number))
                Console.WriteLine("Invalid Input Please try again");
            return Convert.ToInt32(number);
        }
        public static void MergeArrays()
		{
            Console.WriteLine("Enter the number of elements for first array");
            int n = GetNumbersFromUser();
            int[] arr = new int[n];
            Console.WriteLine("Enter the values");
            for (int i = 0; i < n; i++)
            {
                arr[i] = GetNumbersFromUser();
            }

            Console.WriteLine("Enter the number of elements for second array");
            int m = GetNumbersFromUser();
            int[] brr = new int[m];
            Console.WriteLine("Enter the values");
            for (int i = 0; i < m; i++)
            {
                brr[i] = GetNumbersFromUser();
            }
            int[] newArray = new int[n+m];
            for(int i=0;i<arr.Length;i++)
            {
                newArray[i] = arr[i];
            }
            for(int i=0;i<brr.Length;i++)
            {
                newArray[arr.Length+i]=brr[i];
            }

            for(int i=0;i<newArray.Length;i++)
            {
                Console.Write(newArray[i]+" ");
            }

        }
	}
}
