using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace DesignPatterns.Singleton
{
    public class FileManager
    {
        private static FileManager _instance;
        private StreamReader _reader;
        private StreamWriter _writer;
        private FileStream _filestream;
        private string _filePath = "input.txt";
        private FileManager()
        {
            _filestream = new FileStream(_filePath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite);
            _writer = new StreamWriter(_filestream);
            _reader = new StreamReader(_filestream);
            Console.WriteLine("File opened.");

        }
        public static FileManager Instance
        {
            get
            {
                if(_instance==null)
                    _instance = new FileManager();
                return _instance;
            }

        }
        public void WriteToFile(string content)
        {
            _writer.WriteLine(content);
            _writer.Flush();
            Console.WriteLine("Written to file: " + content);
        }

        public void ReadFromFile()
        {
            _reader.BaseStream.Seek(0, SeekOrigin.Begin);
            Console.WriteLine("\nReading from file:");
            string line;
            while ((line = _reader.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }

        }
        public void CloseFile()
        {
            _writer?.Close();
            _reader?.Close();
            Console.WriteLine("File closed.");
        }
    }
}
