using System;
namespace Employees
{
    class Employee : IComparable<Employee>

    {
        int id, age;
        string name;
        double salary;
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
            id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Please enter the employee name");
            name = Console.ReadLine();
            Console.WriteLine("Please enter the employee age");
            age = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Please enter the employee salary");
            salary = Convert.ToDouble(Console.ReadLine());
        }
        public override string ToString()
        {
            return "Employee ID : " + id + "\nName : " + name + "\nAge : " + age + "\nSalary : " + salary;
        }

        static int GetPromotionPosition(List<string> list, string name)
        {
            int index = list.IndexOf(name);
            return (index != -1) ? index + 1 : -1;
        }
        public void Easy_EmployeePromotion()
        {
            //1
            Console.WriteLine("Please Enter the number of Employees");
            int n=int.Parse(Console.ReadLine());

            Console.WriteLine("Please enter the employee names in the order of their eligibility for promotion(Please enter blank to stop) ");
            List<string> list = new List<string>();
            for(int i=0;i<n;i++)
            {
                string? name=Console.ReadLine();
                list.Add(name);
            Console.WriteLine($"\nThe current size of the collection is: {list.Capacity}");
            }

            //3
            list.TrimExcess();
            Console.WriteLine($"The size after removing the extra space is: {list.Capacity}");

            //2
            Console.WriteLine("Please enter the name of the employee to check promotion position ");
            string? empName = Console.ReadLine();
            int x = GetPromotionPosition(list, empName);
            if (x == -1)
                Console.WriteLine("Invalid Name");
            else
                Console.WriteLine($"${empName} is in the position {x} for promotion. ");

            //4
            list.Sort();
            // Print the sorted list
            Console.WriteLine("Promoted employee list: ");
            foreach (string name in list)
            {
                Console.WriteLine(name);
            }
        }

        //medium
        public void Medium_employee()
        {
            List<Employee> employeeList = new List<Employee>();
            Dictionary<int, Employee> employeeDict = new Dictionary<int, Employee>();
            Console.WriteLine("Enter the number Of Employees to Add");
            int n=int.Parse(Console.ReadLine());

            for(int i=0;i<n; i++)
            {
                Employee emp = new Employee();
                emp.TakeEmployeeDetailsFromUser();
                if (employeeDict.ContainsKey(emp.Id))
                {
                    Console.WriteLine("Error: Duplicate ID! Employee not added.");
                }
                else
                {
                    employeeDict.Add(emp.Id, emp);
                    employeeList.Add(emp);
                }
            }
            Console.WriteLine("Completed Inserting Employee details");
            //1
            //SearchByEmployeeId(employeeDict);

            //2 Sortbased on salary and print employee details based on id
            //SortbasedonSalary(employeeDict);

            //3 Employee by name 
            //EmployeeByname(employeeList);

            //4 Elder Employees
            //olderThanOther(employeeList);

        }
        
        //1
        public static void SearchByEmployeeId(Dictionary<int, Employee> employeeDict)
        {
            Console.WriteLine("Enter an Employee ID to fetch details:");
            int searchId = int.Parse(Console.ReadLine());
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
            return this.Salary.CompareTo(other.Salary);
        }
        public void SortbasedonSalary(List<Employee> employeeList)
        {
            employeeList.Sort();

            foreach (var emp in employeeList)
            {
                Console.WriteLine($"{emp.Name} - {emp.Salary}");
            }

            //2b

            Console.WriteLine("Enter employee ID to search:");
            int searchId = int.Parse(Console.ReadLine());

            var empById = employeeList.Where(e => e.Id == searchId).FirstOrDefault();
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
        public static void EmployeeByname(List<Employee> employeeList)
        {
            Console.WriteLine("Enter employee name to search:");
            string searchName = Console.ReadLine();
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
        public static void olderThanOther(List<Employee> employeeList)
        {
            Console.WriteLine("Enter employee ID to find employees older than this employee:");
            int elderThanId = int.Parse(Console.ReadLine());
            var elderEmployee = employeeList.Where(e => e.Id == elderThanId).FirstOrDefault();
            if (elderEmployee != null)
            {
                var olderEmployees = employeeList.Where(e => e.Age > elderEmployee.Age).ToList();

                if (olderEmployees.Count > 0)
                {
                    Console.WriteLine($"\nEmployees older than {elderEmployee.Name} (Age {elderEmployee.Age}):");
                    foreach (var emp in olderEmployees)
                        Console.WriteLine(emp);
                }
                else
                {
                    Console.WriteLine($"No employees are older than {elderEmployee.Name}.");
                }
            }
            else
            {
                Console.WriteLine("Employee ID for comparison not found.");
            }

        }


        //hard
        public void Hard_employee()
        {
            Dictionary<int, Employee> employeeDict = new Dictionary<int, Employee>();
            bool flag = true;
            while(flag)
            {
                Console.WriteLine("\n--- Employee Management Menu ---");
                Console.WriteLine("1. Add Employee");
                Console.WriteLine("2. Print All Employees");
                Console.WriteLine("3. Modify Employee (except ID)");
                Console.WriteLine("4. Print Employee by ID");
                Console.WriteLine("5. Delete Employee by ID");
                Console.WriteLine("6. Exit");
                Console.Write("Enter your choice: ");

                int choice = int.Parse(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        employeeDict=addEmployee(employeeDict);
                        break;
                    case 2:
                        printEmployees(employeeDict);
                        break;
                    case 3:
                        employeeDict=ModifyEmployee(employeeDict);
                        break;
                    case 4:
                        PrintByID(employeeDict);
                        break;
                    case 5:
                        employeeDict=DeleteByID(employeeDict);
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
        public static Dictionary<int, Employee> addEmployee(Dictionary<int, Employee> employeeDict)
        {
            try
            {
                Employee emp = new Employee();
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
        public static void printEmployees(Dictionary<int, Employee> employeeDict)
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
        public static Dictionary<int, Employee> ModifyEmployee(Dictionary<int, Employee> employeeDict)
        {
            Console.Write("Enter the ID of the employee to modify: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                if (employeeDict.TryGetValue(id, out Employee emp))
                {
                    Console.Write("Enter new Name: ");
                    emp.Name = Console.ReadLine();

                    Console.Write("Enter new Age: ");
                    emp.Age = int.Parse(Console.ReadLine());

                    Console.Write("Enter new Salary: ");
                    emp.Salary = double.Parse(Console.ReadLine());

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
        public static void PrintByID(Dictionary<int, Employee> employeeDict)
        {
            Console.Write("Enter Employee ID: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                if (employeeDict.TryGetValue(id, out Employee emp))
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

        public static Dictionary<int, Employee> DeleteByID(Dictionary<int, Employee> employeeDict)
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


        public int Id { get => id; set => id = value; }
        public int Age { get => age; set => age = value; }
        public string Name { get => name; set => name = value; }
        public double Salary { get => salary; set => salary = value; }

    }
    public class Task2
	{
		public static void EmployeeDetails()
		{
            Employee emp = new Employee();

            //emp.Easy_EmployeePromotion();
            //emp.Medium_employee();
            emp.Hard_employee();
        }
    }

}

