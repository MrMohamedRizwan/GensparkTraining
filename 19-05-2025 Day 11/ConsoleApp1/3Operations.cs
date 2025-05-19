using System;

namespace Operation
{
    public class Task3
    {
        static void MathOperation(int a, int b, char op)
        {
            int result = 0;
            if (op == '+')
                result = a + b;
            else if (op == '-')
                result = Math.Abs(a - b);
            else if (op == '*')
                result = a * b;
            else if (op == '/')
            {
                try
                {
                    result = a / b;
                }
                catch (DivideByZeroException ex)
                {
                    Console.WriteLine("Error: Division by zero is not allowed.");
                    Console.WriteLine($"Exception Message: {ex.Message}");
                }
            }

            Console.WriteLine($"{a} {op} {b} = {result}");
        }
        public static void Operations()
        {
            int a = Convert.ToInt32(Console.ReadLine());
            int b = Convert.ToInt32(Console.ReadLine());
            char op = Console.ReadKey().KeyChar;
            Console.WriteLine();
            if (op != '+' && op != '-' && op != '*' && op != '/')
            {
                Console.WriteLine("Enter a valid Operator");
            }
            else
            {

                MathOperation(a, b, op);
            }
        }
    }
}
