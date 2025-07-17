
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Azure.Storage.Blobs;
using BlobAPI.Models;

namespace BlobTestApp.Services
{
    public class BlobStorageService
    {
        private BlobContainerClient _containerClinet;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<BlobStorageService> _logger;

        public BlobStorageService(IConfiguration configuration, IHttpClientFactory httpClientFactory,
            ILogger<BlobStorageService> logger)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }
        private async Task<BlobClient> GetBlobClientWithSas(string fileName)
        {

            var client = _httpClientFactory.CreateClient();
            var sasResponse = await client.GetAsync(functionUrl);
            if (!sasResponse.IsSuccessStatusCode)
            {
                var error = await sasResponse.Content.ReadAsStringAsync();
                _logger.LogError($"Failed to get SAS URL: {error}");
                throw new InvalidOperationException("Could not obtain SAS URL.");
            }

            var sasData = await sasResponse.Content.ReadFromJsonAsync<SasResponse>();
            if (sasData == null || string.IsNullOrWhiteSpace(sasData.sasUrl))
            {
                throw new InvalidOperationException("SAS URL response invalid.");
            }

            _logger.LogInformation($"SAS URL obtained: {sasData.sasUrl}");

            // Create BlobClient directly using the SAS URL
            return new BlobClient(new Uri(sasData.sasUrl));
        }


        // private async Task UpdateContainerClient()
        // {
        //     var blobUrl = _configuration["AzureBlob:KeyVaultUrl"];
        //     SecretClient secretClient = new SecretClient(new Uri(blobUrl), new DefaultAzureCredential());
        //     KeyVaultSecret secret = await secretClient.GetSecretAsync("SasURL");
        //     var blobUrlValue = secret.Value;
        //     Console.WriteLine($"\n\n\nBlob URL: {blobUrlValue}\n\n\n");
        //     _containerClinet = new BlobContainerClient(new Uri(blobUrlValue));
        // }

        // public async Task UploadFile(Stream fileStream,string fileName)
        // {
        //     await UpdateContainerClient();
        //     var blobClient = _containerClinet.GetBlobClient(fileName);
        //     await blobClient.UploadAsync(fileStream,overwrite:true);
        // }

        // public async Task<Stream> DownloadFile(string fileName)
        // {
        //     Console.WriteLine($"Downloading file: {fileName}");
        //     await UpdateContainerClient();
        //     // var blobClient = _containerClinet?.GetBlobClient(fileName);
        //     // if(await blobClient.ExistsAsync())
        //     // {
        //     //     var downloadInfor = await blobClient.DownloadStreamingAsync();
        //     //     return downloadInfor.Value.Content;
        //     // }
        //     return null;
        // }
        
        public async Task UploadFile(Stream fileStream, string fileName)
        {
            var blobClient = await GetBlobClientWithSas(fileName);
            await blobClient.UploadAsync(fileStream, overwrite: true);
        }

        public async Task<Stream> DownloadFile(string fileName)
        {
            var blobClient = await GetBlobClientWithSas(fileName);
            if (await blobClient.ExistsAsync())
            {
                var downloadInfo = await blobClient.DownloadStreamingAsync();
                return downloadInfo.Value.Content;
            }
            return null;
        }
    }
}
