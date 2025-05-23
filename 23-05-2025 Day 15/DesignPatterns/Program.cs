using DesignPatterns.Singleton;

class Program
{
    public static void Main(string[] args)
    {
        //SingleTon
        FileManager fileManagaer = FileManager.Instance;
        fileManagaer.WriteToFile("Singleton");
        fileManagaer.ReadFromFile();
        fileManagaer.CloseFile();
        
    }
}