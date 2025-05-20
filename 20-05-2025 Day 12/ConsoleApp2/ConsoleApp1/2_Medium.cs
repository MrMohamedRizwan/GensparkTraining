using Employees;
using System;
namespace medium_Employees
{
    class Employee : IComparable<Employee>

    {

        public int Id { get => id; set => id = value; }
        public int Age { get => age; set => age = value; }
        public string Name { get => name; set => name = value; }
        public double Salary { get => salary; set => salary = value; }
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out number))
                Console.WriteLine("Invalid number Please try again");
            return Convert.ToInt32(number);
        }
        public static string GetStringFromUser()
        {
            string str;
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

        int id, age;
        string name;
        double salary;

        public static List<Employee> employeeList = new List<Employee>();
        public static Dictionary<int, Employee> employeeDict = new Dictionary<int, Employee>();
        public Employee()
        {

        }
        public Employee(int id, int age, string name, double salary)
        {
            this.id = id;
            this.age = age;
            this.name = name;
            this.salary = salary;
        }
        public void TakeEmployeeDetailsFromUser()
        {
            Console.WriteLine("Please enter the employee ID");
            id = GetNumbersFromUser();
            Console.WriteLine("Please enter the employee name");
            name = GetStringFromUser();
            Console.WriteLine("Please enter the employee age");
            age = GetNumbersFromUser();
            Console.WriteLine("Please enter the employee salary");
            salary = GetNumbersFromUser();
        }
        public override string ToString()
        {
            return "Employee ID : " + id + "\nName : " + name + "\nAge : " + age + "\nSalary : " + salary;
        }
        public static void EmployeeDetails()
		{
            Console.WriteLine("Enter the number Of Employees to Add");
            int n = GetNumbersFromUser();

            for (int i = 0; i < n; i++)
            {
                Employee emp = new Employee();
                emp.TakeEmployeeDetailsFromUser();
                if (employeeDict.ContainsKey(emp.id))
                {
                    Console.WriteLine("Error: Duplicate ID! Employee not added.");
                }
                else
                {
                    employeeDict.Add(emp.id, emp);
                    employeeList.Add(emp);
                }
            }
            Console.WriteLine("Completed Inserting Employee details");

            bool flag = true;
            while(flag)
            {
                Console.WriteLine("Employee Management System - Choose an option:");
                Console.WriteLine("1. Search employee by ID");
                Console.WriteLine("2. Sort employees based on salary and print details");
                Console.WriteLine("3. Search employee(s) by name");
                Console.WriteLine("4. Display employees older than a certain age");
                Console.WriteLine("5. Exit");

                int choice = GetNumbersFromUser();
                if (choice == 1)
                    SearchByEmployeeId();
                else if (choice == 2)
                    SortbasedonSalary();
                else if (choice == 3)
                    EmployeeByname();
                else if (choice == 4)
                    olderThanOther();
                else if (choice == 5)
                { flag = false; break; }
                else
                    Console.WriteLine("Invalid Choice");


            }
            //1
            //SearchByEmployeeId();

            //2 Sortbased on salary and print employee details based on id
            //SortbasedonSalary();

            //3 Employee by name 
            //EmployeeByname();

            //4 Elder Employees
            //olderThanOther();

        }
        //1
        public static void SearchByEmployeeId()
        {
            Console.WriteLine("Enter an Employee ID to fetch details:");
            int searchId = GetNumbersFromUser();
            if (employeeDict.TryGetValue(searchId, out Employee foundEmp))
            {
                Console.WriteLine("\nEmployee Found:");
                Console.WriteLine(foundEmp.ToString());
            }
            else
            {
                Console.WriteLine("Employee with given ID not found.");
            }
        }
        //2a
        public int CompareTo(Employee? other)
        {
            if (other == null) return 1;
            return this.salary.CompareTo(other.salary);
        }
        public static void SortbasedonSalary()
        {
            employeeList.Sort();

            foreach (var emp in employeeList)
            {
                Console.WriteLine($"{emp.name} - {emp.salary}");
            }

            //2b

            Console.WriteLine("Enter employee ID to search:");
            int searchId = GetNumbersFromUser();

            var empById = employeeList.Where(e => e.id == searchId).FirstOrDefault();
            if (empById != null)
            {
                Console.WriteLine("\nEmployee found:");
                Console.WriteLine(empById);
            }
            else
            {
                Console.WriteLine("Employee not found.");
            }


        }

        //3
        public static void EmployeeByname()
        {
            Console.WriteLine("Enter employee name to search:");
            string searchName = GetStringFromUser();
            var employeesByName = employeeList.Where(e => e.name.Equals(searchName)).ToList();
            if (employeesByName.Count > 0)
            {
                Console.WriteLine($"\nEmployees with name '{searchName}':");
                foreach (var emp in employeesByName)
                    Console.WriteLine(emp);
            }
            else
            {
                Console.WriteLine($"No employees found with the name '{searchName}'.");
            }
        }
        //4 
        public static void olderThanOther()
        {
            Console.WriteLine("Enter employee ID to find employees older than this employee:");
            int elderThanId = GetNumbersFromUser();
            var elderEmployee = employeeList.Where(e => e.id == elderThanId).FirstOrDefault();
            if (elderEmployee != null)
            {
                var olderEmployees = employeeList.Where(e => e.age > elderEmployee.age).ToList();

                if (olderEmployees.Count > 0)
                {
                    Console.WriteLine($"\nEmployees older than {elderEmployee.name} (Age {elderEmployee.age}):");
                    foreach (var emp in olderEmployees)
                        Console.WriteLine(emp);
                }
                else
                {
                    Console.WriteLine($"No employees are older than {elderEmployee.name}.");
                }
            }
            else
            {
                Console.WriteLine("Employee ID for comparison not found.");
            }

        }


    }
}
