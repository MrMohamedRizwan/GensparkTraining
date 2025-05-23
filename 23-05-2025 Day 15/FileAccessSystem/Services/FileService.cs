using FileAccessSystem.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileAccessSystem.Services
{
    public class FileService : IFile
    {
        private StreamReader _reader;
        private FileStream _filestream;
        private string _filePath = @"C:\Users\vc\OneDrive - Presidio Network Solutions\Desktop\GenSpark Training\23-05-2025 Day 15\FileAccessSystem\Services\data.txt";
        public void Read()
        {
            Console.WriteLine("The Content Inside the file");
            FileStream fileStream = null;
            StreamReader reader = null;

            try
            {
                if (!File.Exists(_filePath))
                {
                    Console.WriteLine("[File not found]");
                    return;
                }

                fileStream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                reader = new StreamReader(fileStream);

                string content = reader.ReadToEnd();
                Console.WriteLine(content);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Error] Failed to read file: {ex.Message}");
            }
            finally
            {
                if (reader != null)
                    reader.Close();

                if (fileStream != null)
                    fileStream.Close();
            }
        }
        public void ReadMetadata()
        {
            Console.WriteLine("\n[File Metadata]");

            if (!File.Exists(_filePath))
            {
                Console.WriteLine("File does not exist.");
                return;
            }

            FileInfo fileInfo = new FileInfo(_filePath);

            Console.WriteLine($"File Name       : {fileInfo.Name}");
            Console.WriteLine($"Full Path       : {fileInfo.FullName}");
            Console.WriteLine($"Size (bytes)    : {fileInfo.Length}");
            Console.WriteLine($"Created On      : {fileInfo.CreationTime}");
            Console.WriteLine($"Last Accessed   : {fileInfo.LastAccessTime}");
            Console.WriteLine($"Last Modified   : {fileInfo.LastWriteTime}");
            Console.WriteLine($"Is Read-Only    : {fileInfo.IsReadOnly}");
        }
    }
}
