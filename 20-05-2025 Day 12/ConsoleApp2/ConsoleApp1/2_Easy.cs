using System;
using System.Collections.Generic;

namespace Easy_Employees
{
	public class Task2_easy_Employees
	{
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out number))
                Console.WriteLine("Invalid Input Please try again");
            return Convert.ToInt32(number);
        }
        public static string GetStringFromUser()
        {
            string ?str;
            while (true)
            {
                Console.WriteLine("Enter Input String");
                str = Console.ReadLine();
                if (string.IsNullOrEmpty(str))
                {
                    Console.WriteLine("Invalid Input Please try again");
                }
                else
                {
                    break;
                }
            }
            return str;
        }

        public static List<string> list = new List<string>();
        //1
        public static void EmployeePromotion()
        {
            Console.WriteLine("Please Enter the number of Employees");
            int n = GetNumbersFromUser();

            Console.WriteLine("Please enter the employee names in the order of their eligibility for promotion");
            for (int i = 0; i < n; i++)
            {
                string? name = GetStringFromUser();
                list.Add(name);
            }
            Console.WriteLine("Data Entered");

        }

        //2
        public static void findPosition()
        {
            Console.WriteLine("Please enter the name of the employee to check promotion position ");
            string? empName = Console.ReadLine();
            int x = GetPromotionPosition(list, empName);
            if (x == -1)
                Console.WriteLine("Invalid Name");
            else
                Console.WriteLine($"{empName} is in the position {x} for promotion. ");


        }
        static int GetPromotionPosition(List<string> list, string name)
        {
            int index = list.IndexOf(name);
            return (index != -1) ? index + 1 : -1;
        }

        //3
        public static void MemoryTrim()
        {
            Console.WriteLine($"Initial Size{list.Capacity}");
            list.TrimExcess();
            Console.WriteLine($"The size after removing the extra space is: {list.Capacity}");
        }

        //4
        public static void DisplaySortedList()
        {
            list.Sort();
            // Print the sorted list
            Console.WriteLine("Promoted employee list: ");
            foreach (string name in list)
            {
                Console.WriteLine(name);
            }

        }


        public static void EmployeeDetails()
		{
            bool flag = true;
            Console.WriteLine("Promotion Management System");
            Console.WriteLine("1. Enter promotion list");
            Console.WriteLine("2. Find position of an employee");
            Console.WriteLine("3. Trim memory usage");
            Console.WriteLine("4. Display sorted promotion list");
            Console.WriteLine("5. Exit");
            while (flag)
            {
                int choice = GetNumbersFromUser();
                if (choice == 1)
                    EmployeePromotion();
                else if (choice == 2)
                    findPosition();
                else if (choice == 3)
                    MemoryTrim();
                else if (choice == 4)
                    DisplaySortedList();
                else if (choice == 5)
                { flag = false; break; }
                else
                    Console.WriteLine("Invalid Choice");

            }
            
        }
	}

}
