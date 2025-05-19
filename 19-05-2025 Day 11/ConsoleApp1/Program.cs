using System;
using System.Net.Http.Headers;
using GreetUser;
using MaximumOfTwoNumbers;
using Operation;
using UsernamePassword;
using DivideBy7;
using FrequencyOfEachElement;
using RotateArray;
using MergeIntoSingleArray;
using SecretWord;
using SudokkuRow;
using Sudokku;
using Encryption;
class Program
{
   
    static void Main(string[] args)
    {

        Task1.Greet();
        Task2.MaximumOfTwo();
        Task3.Operations();
        Task4.CheckUsernamePwd();
        Task5.divideBy7();
        Task6.Frequency();
        Task7.RotateArray();
        Task8.MergeArrays();
        Task9.secretWord();
        Task10.sudokku();
        Task11.sudokku();
        Task12.encryption();

        Console.ReadKey();

    }

}