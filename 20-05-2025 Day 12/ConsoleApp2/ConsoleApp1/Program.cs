//using Employees;
using JaggedArray;
using System;
using Easy_Employees;
using medium_Employees;
using Hard_employee;
class Program
{
    static void Main(string[] args)
    {
        //Task 1
        Task1.jaggedArray();

        //Task2
        //Task2.EmployeeDetails();// For all Three(Easy, Medium, Hard)
        Task2_easy_Employees.EmployeeDetails();//Easy
        Employee.EmployeeDetails(); //Medium
        Hard_employee.Employees.EmployeeDetails();//Hard

    }
}
