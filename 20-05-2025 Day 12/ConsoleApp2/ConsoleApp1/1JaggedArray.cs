using System;
namespace JaggedArray
{
    class InstagramPost
    {
        public string caption { get; set; }
        public int like { get; set; }

        public InstagramPost(string caption, int like)
        {
            this.caption = caption;
            this.like = like;
        }
    }
	public class Task1
	{
        public static string GetStringFromUser()
        {
            string? str;
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
        public static int GetNumbersFromUser()
        {
            int number;
            while (!int.TryParse(Console.ReadLine(), out number))
                Console.WriteLine("Invalid Input Please try again");
            return Convert.ToInt32(number);
        }
        public static void jaggedArray()
		{
			Console.WriteLine("Enter number of users: ");
            int n=GetNumbersFromUser();
            InstagramPost[][] jaggedArray = new InstagramPost[n][];
            for(int i=0;i<n;i++)
            {
                int postCount;
                Console.WriteLine("How many post ?");
                postCount = GetNumbersFromUser();

                jaggedArray[i] = new InstagramPost[postCount]; //here new is used for jagged array

                for(int j=0;j<postCount;j++)
                {
                    Console.WriteLine($"Enter Caption for Post {i + 1}");
                    string caption = GetStringFromUser();

                    Console.WriteLine($"Enter Likes");
                    int likes = GetNumbersFromUser();

                    jaggedArray[i][j]=new InstagramPost(caption,likes); //new is used here to create a new object

                }
            }
            Console.WriteLine("Output");
            for(int i=0;i<n;i++)
            {
                for(int j=0;j<jaggedArray[i].Length;j++)
                {
                    var post=jaggedArray[i][j];
                    Console.WriteLine($"User{i+1} | Post {j + 1} | Caption: {post.caption} | Likes: {post.like}");
                }
            }
        }
    }

}
