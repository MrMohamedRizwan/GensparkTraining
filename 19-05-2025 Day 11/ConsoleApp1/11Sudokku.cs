using System;
namespace Sudokku
{
	public class Task11
	{
        static bool isRowValid(int[,] board, int row)
        {
            bool[] vis = new bool[10];
            for(int j=0; j<9; j++)
            {
                int num = board[row, j];
                if (vis[num])
                    return false;
                vis[num] = true;
            }
            return true;
        }

        static bool isColumnValid(int[,] board, int column)
        {
            bool[] vis = new bool[10];
            for(int i=0;i<9;i++)
            {
                int num = board[column,i];
                if (vis[num])
                    return false;
                vis[num] = true;
            }
            return true;
        }
        static bool isSubGrid(int[,] board,int row,int col)
        {
            bool[] vis = new bool[10];
            for(int i=0;i<3;i++)
            {
                for(int j=0;j<3;j++)
                {
                    int num = board[row,j];
                    if(vis[num])
                        return false;
                    vis[num] = true;
                }
            }
            return true;

        }

        static bool IsValidSudoku(int[,] board)
        {
            for (int i = 0; i < 9; i++)
            {
                if (!isRowValid(board, i) || !isColumnValid(board, i))
                    return false;
            }
            for (int i = 0; i < 9; i += 3)
            {
                for (int j = 0; j < 9; j += 3)
                {
                    if (!isSubGrid(board, i, j))
                        return false;
                }
            }

            return true;
        }

        public static void sudokku()
		{
            int[,] board = {
            {5,3,4,6,7,8,9,1,2},
            {6,7,2,1,9,5,3,4,8},
            {1,9,8,3,4,2,5,6,7},
            {8,5,9,7,6,1,4,2,3},
            {4,2,6,8,5,3,7,9,1},
            {7,1,3,9,2,4,8,5,6},
            {9,6,1,5,3,7,2,8,4},
            {2,8,7,4,1,9,6,3,5},
            {3,4,5,2,8,6,1,7,9}
        };

            Console.WriteLine(IsValidSudoku(board) ? "Valid Sudoku board." : "Invalid Sudoku board.");
        }
	}
}
