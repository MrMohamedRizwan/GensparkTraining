using System;

namespace Hard_employee
{
    class Employees

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

        public Employees()
        {

        }
        public Employees(int id, int age, string name, double salary)
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
            Dictionary<int, Employees> employeeDict = new Dictionary<int, Employees>();
            bool flag = true;
            while (flag)
            {
                Console.WriteLine("\n--- Employee Management Menu ---");
                Console.WriteLine("1. Add Employee");
                Console.WriteLine("2. Print All Employees");
                Console.WriteLine("3. Modify Employee (except ID)");
                Console.WriteLine("4. Print Employee by ID");
                Console.WriteLine("5. Delete Employee by ID");
                Console.WriteLine("6. Exit");
                Console.Write("Enter your choice: ");

                int choice = GetNumbersFromUser();
                switch (choice)
                {
                    case 1:
                        employeeDict = addEmployee(employeeDict);
                        break;
                    case 2:
                        printEmployees(employeeDict);
                        break;
                    case 3:
                        employeeDict = ModifyEmployee(employeeDict);
                        break;
                    case 4:
                        PrintByID(employeeDict);
                        break;
                    case 5:
                        employeeDict = DeleteByID(employeeDict);
                        break;
                    case 6:
                        flag = false;
                        break;

                    default:
                        Console.WriteLine("Invalid Choice Try again!");
                        break;
                }

            }
        }
        public static Dictionary<int, Employees> addEmployee(Dictionary<int, Employees> employeeDict)
        {
            try
            {
                Employees emp = new Employees();
                emp.TakeEmployeeDetailsFromUser();
                if (employeeDict.ContainsKey(emp.Id))
                {
                    Console.WriteLine("Error: Duplicate ID! Employee not added.");
                }
                else
                {
                    employeeDict.Add(emp.Id, emp);
                }

            }
            catch
            {
                Console.WriteLine("Error while adding Employee");
            }
            return employeeDict;
        }
        public static void printEmployees(Dictionary<int, Employees> employeeDict)
        {
            if (employeeDict.Count == 0)
            {
                Console.WriteLine("No employees found.");
                return;
            }

            Console.WriteLine("\n--- Employee List ---");
            foreach (var emp in employeeDict.Values)
            {
                Console.WriteLine(emp);
            }
        }
        public static Dictionary<int, Employees> ModifyEmployee(Dictionary<int, Employees> employeeDict)
        {
            Console.Write("Enter the ID of the employee to modify: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                if (employeeDict.TryGetValue(id, out Employees emp))
                {
                    Console.Write("Enter new Name: ");
                    emp.Name = GetStringFromUser();

                    Console.Write("Enter new Age: ");
                    emp.Age = GetNumbersFromUser();

                    Console.Write("Enter new Salary: ");
                    emp.Salary = double.Parse(GetStringFromUser());

                    Console.WriteLine("Employee details updated.");
                }
                else
                {
                    Console.WriteLine("Employee with the given ID not found.");
                }
            }
            else
            {
                Console.WriteLine("Invalid ID format.");
            }

            return employeeDict;

        }
        public static void PrintByID(Dictionary<int, Employees> employeeDict)
        {
            Console.Write("Enter Employee ID: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                if (employeeDict.TryGetValue(id, out Employees emp))
                {
                    Console.WriteLine(emp);
                }
                else
                {
                    Console.WriteLine("Employee not found.");
                }
            }
            else
            {
                Console.WriteLine("Invalid ID format.");
            }
        }

        public static Dictionary<int, Employees> DeleteByID(Dictionary<int, Employees> employeeDict)
        {
            Console.Write("Enter the ID of the employee to delete: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                if (employeeDict.Remove(id))
                {
                    Console.WriteLine("Employee deleted.");
                }
                else
                {
                    Console.WriteLine("Employee not found.");
                }
            }
            else
            {
                Console.WriteLine("Invalid ID format.");
            }
            return employeeDict;
        }
    }

}