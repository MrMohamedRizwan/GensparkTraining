using System;
namespace Encryption
{
	public class Task12
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
        static string toDecrypt(string str, int shift)
        {
            char[] result = new char[str.Length];
            for (int i = 0; i < str.Length; i++)
            {
                result[i] = (char)('a' + ((str[i] - 'a' - shift + 26) % 26));
            }
            return new string(result);

        }
        static string toEncrypt(string str, int shift)
        {
            char[] result= new char[str.Length];
            for(int i = 0;i<str.Length;i++)
            {
                result[i] = (char)('a' + (str[i] - 'a' + shift) % 26);

            }
            return new string(result);
        }
        public static void encryption()
		{
            string? str;
            str = GetStringFromUser();
            int shift;
            shift=GetNumbersFromUser();
            string EncryptedValue =toEncrypt(str, shift);
            Console.WriteLine($"Encrypted String {EncryptedValue}");
            string DecryptedValue=toDecrypt(EncryptedValue, shift);
            Console.WriteLine($"Decrypted String {DecryptedValue}");
        }
    }

}

