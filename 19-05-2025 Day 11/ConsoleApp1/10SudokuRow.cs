using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SudokkuRow
{
	public class Task10
	{
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out number) )
                Console.WriteLine("Invalid Input Please try again");
            return Convert.ToInt32(number);
        }

        static bool CheckifValid(int[] arr)
        {
            bool[] visited = new bool[9];
            foreach (int i in arr)
            {
                if (i < 0 || i>9)
                    return false;
                visited[i-1] = true;
            }
           foreach (var i in visited)
            {
                if(i==false)
                    return false;
            }
           return true;
        }
        

        public static void sudokku()
		{
            int[] arr = new int[9];
            for (int i = 0; i < 9;i++)
            {
                arr[i] = GetNumbersFromUser();
            }
            if (CheckifValid(arr))
                Console.WriteLine("Valid Sudoku");
            else
                Console.WriteLine("Invalid Sudokku");
		}
	}
}
