/*
using static System.Runtime.InteropServices.JavaScript.JSType;

9) Write a program that:

Has a predefined secret word (e.g., "GAME").

Accepts user input as a 4-letter word guess.

Compares the guess to the secret word and outputs:

X Bulls: number of letters in the correct position.

Y Cows: number of correct letters in the wrong position.

Continues until the user gets 4 Bulls (i.e., correct guess).

Displays the number of attempts.

Bull = Correct letter in correct position.

Cow = Correct letter in wrong position.

Secret Word	User Guess	Output	Explanation
GAME	GAME	4 Bulls, 0 Cows	Exact match
GAME	MAGE	1 Bull, 3 Cows	A in correct position, MGE misplaced
GAME	GUYS	1 Bull, 0 Cows	G in correct place, rest wrong
GAME	AMGE	2 Bulls, 2 Cows	A, E right; M, G misplaced
NOTE	TONE	2 Bulls, 2 Cows	O, E right; T, N misplaced
*/

using System;
using System.Security;
namespace SecretWord
{
	public class Task9
	{
		public static void secretWord()
		{
			string ans = "GAME";
			int ctr = 0;
			string guess;
			while (true)
			{
				Console.WriteLine("Enter Your Guess");
				guess = Console.ReadLine().ToUpper();
				if (string.IsNullOrEmpty(guess) || guess.Length != 4)
				{
					Console.WriteLine("Invalid Input Please try again");
					continue;
				}
				ctr++;
				int bulls = 0, cows = 0;
				bool[] secretVisited = new bool[4];
				bool[] guessVisited = new bool[4];
				for (int i = 0; i < 4; i++)
				{
					if (guess[i] == ans[i])
					{
						bulls++;
						secretVisited[i] = true;
						guessVisited[i] = true;

					}

				}
				for (int i = 0; i < 4; i++)
				{
					if (!guessVisited[i])
						for (int j = 0; j < 4; j++)
						{
							if (!secretVisited[i] && guess[i] == ans[j])
							{
								guessVisited[i] = true;
								cows++;
								break;
							}
						}
				}

				if (bulls == 4)
				{
					Console.WriteLine($"Congrats Attempts {ctr}");
					break;
				}
				else
					Console.WriteLine($"{bulls} Bulls & {cows} Cows");
			}
		}
	}
}
