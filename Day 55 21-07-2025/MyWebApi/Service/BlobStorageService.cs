using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MyWebApi.Service
{
    public class BlobStorageService
    {
        private readonly BlobContainerClient _containerClient;

        public BlobStorageService(IConfiguration configuration)
        {
            var sasUrl = configuration["AzureBlob:ContainerSasUrl"];
            Console.WriteLine($"\n\nBlobStorageService initialized with SAS URL: {sasUrl}\n\n");

            if (string.IsNullOrEmpty(sasUrl))
            {
                throw new ArgumentException("Azure Blob Storage SAS URL is not configured.");
            }

            _containerClient = new BlobContainerClient(new Uri(sasUrl));

        }


        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            var contentType = file.ContentType;

            var blobClient = _containerClient.GetBlobClient(Guid.NewGuid() + fileExtension);

            var httpHeaders = new BlobHttpHeaders
            {
                ContentType = contentType,
                ContentDisposition = "inline"
            };

            using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, new BlobUploadOptions
            {
                HttpHeaders = httpHeaders
            });

            return blobClient.Uri.ToString(); 
        }

    }
}
