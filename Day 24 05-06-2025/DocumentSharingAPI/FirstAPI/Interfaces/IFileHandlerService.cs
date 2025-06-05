using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Interfaces
{
    public interface IFileHandlerService
    {
        public Task<string> UploadFileAsync(IFormFile file);
        public byte[] DownloadFile(string fileName);
        public Task<string> TestNotification();
    }
}