## Structure

The project contains the following files:

| File Name                | Description                                            |
|--------------------------|--------------------------------------------------------|
| Program.cs               | Main file containing the `Main` method (entry point). |
| 1GreetUser.cs            | Greets the user by name.                              |
| 2MaximumOfTwoNumbers.cs  | Finds the maximum of two numbers.                     |
| 3Operations.cs           | Performs arithmetic operations (+, -, *, /).          |
| 4CheckUserNamePwd.cs     | Checks username and password with 3 attempts.         |
| 5DivideBy7.cs            | Counts numbers divisible by 7.                        |
| 6Frequency.cs            | Counts frequency of each element in an array.         |
| 7RotateArray.cs          | Rotates an array to the left by one position.         |
| 8MergeIntoSingleArray.cs | Merges two arrays into one.                           |
| 9SecretWord.cs           | Implements Bulls and Cows word game.                  |
| 10SudokuRow.cs           | Validates a Sudoku row.                               |
| 11Sudoku.cs              | Validates a full Sudoku board.                        |
| 12Encryption.cs          | Encrypts and decrypts messages with Caesar cipher.    |

---

## Questions

1. **Greet User**  
   Create a program that takes a name from the user and greets them.

2. **Maximum of Two Numbers**  
   Take two numbers from the user and print the largest.

3. **Arithmetic Operations**  
   Take two numbers and an operation (+, -, *, /) from the user, perform the operation, and print the result.

4. **Username and Password Check**  
   Take username and password from the user. If username is "Admin" and password is "pass", print a success message.  
   Give the user 3 attempts. After 3 invalid attempts, print:  
   `Invalid attempts for 3 times. Exiting....`

5. **Divisible by 7**  
   Take 10 numbers from the user and print how many are divisible by 7.

6. **Frequency of Each Element**  
   Given an array, count and print the frequency of each element.  
   **Input:** `{1, 2, 2, 3, 4, 4, 4}`  
   **Output:**  
   ```
   1 occurs 1 times  
   2 occurs 2 times  
   3 occurs 1 times  
   4 occurs 3 times
   ```

7. **Rotate Array Left by One**  
   Rotate an array to the left by one position.  
   **Input:** `{10, 20, 30, 40, 50}`  
   **Output:** `{20, 30, 40, 50, 10}`

8. **Merge Two Arrays**  
   Merge two integer arrays into a single array.  
   **Input:** `{1, 3, 5}` and `{2, 4, 6}`  
   **Output:** `{1, 3, 5, 2, 4, 6}`

9. **Bulls and Cows Game**  
   - Predefined secret word (e.g., "GAME").
   - User inputs a 4-letter guess.
   - Output:  
     - X Bulls: correct letters in correct positions.  
     - Y Cows: correct letters in wrong positions.
   - Continue until 4 Bulls (correct guess).
   - Display number of attempts.

   | Secret Word | User Guess | Output         | Explanation                        |
   |-------------|------------|---------------|------------------------------------|
   | GAME        | GAME       | 4 Bulls, 0 Cows| Exact match                        |
   | GAME        | MAGE       | 2 Bulls, 2 Cows| AE correct, MG misplaced           |
   | GAME        | GUYS       | 1 Bull, 0 Cows | G correct, rest wrong              |
   | GAME        | AMGE       | 2 Bulls, 2 Cows| A, E right; M, G misplaced         |
   | NOTE        | TONE       | 2 Bulls, 2 Cows| O, E right; T, N misplaced         |

10. **Validate Sudoku Row**  
    Accept a 9-element array representing a Sudoku row.  
    - Check if it contains all numbers from 1 to 9 with no duplicates.
    - Display if the row is valid or invalid.

11. **Validate Sudoku Board**  
    Extend question 10 to validate all 9 rows of a Sudoku board (`int[,] board = new int[9,9]`).

12. **Caesar Cipher Encryption/Decryption**  
    - Input: message string (lowercase, no spaces/symbols).
    - Encrypt by shifting each character forward by 3.
    - Decrypt by shifting backward by 3.
    - Handle wrap-around (e.g., 'z' becomes 'c').

    **Examples:**

    | Input | Shift | Encrypted | Decrypted |
    |-------|-------|-----------|-----------|
    | hello | 3     | khoor     | hello     |
    | world | 3     | zruog     | world     |
    | xyz   | 3     | abc       | xyz       |
    | apple | 1     | bqqmf     | apple     |

