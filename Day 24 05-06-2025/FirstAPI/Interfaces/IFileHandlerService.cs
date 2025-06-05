using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Interfaces
{
    public interface IFileHandlerService
    {
        Task<string> UploadFileAsync(IFormFile file);
        byte[] DownloadFile(string fileName);
    }
}