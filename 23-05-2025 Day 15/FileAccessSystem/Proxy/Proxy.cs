using FileAccessSystem.Interfaces;
using FileAccessSystem.Models;
using FileAccessSystem.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileAccessSystem.Proxy
{

    public class Proxy : IFile
    {
        public readonly Users _user;
        private readonly FileService _fileService;

        public Proxy(Users user) 
        {
            _fileService = new FileService();
            _user = user;
            
        }
        public void Read()
        {
            Console.WriteLine($"{_user.Id} User: {_user.Name} | Role: {_user.Role}");
            if (_user.Role == "Admin")
            {
                Console.WriteLine("[Access Granted]");
                _fileService.Read();
            }
            else if(_user.Role=="User")
            {
                Console.WriteLine("[Limited Access] You can only view metadata.");
                _fileService.ReadMetadata();
            }
            else
            {
                Console.WriteLine("[Access Denied] Insufficient privileges.");
            }
        }

    }
}
