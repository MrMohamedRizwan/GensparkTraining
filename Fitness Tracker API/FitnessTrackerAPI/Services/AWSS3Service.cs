using System;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using FitnessTrackerAPI.Interfaces;

namespace FitnessTrackerAPI.Services
{
    public class AWSS3Service : IAWSService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName = "fitnessdbbucket";

        public AWSS3Service(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        public async Task<string> UploadFileAsync(IFormFile file, string folderName)
        {
            try
            {
                var fileName = $"{folderName}/{Guid.NewGuid()}_{file.FileName}";
                using var stream = file.OpenReadStream();

                var request = new PutObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileName,
                    InputStream = stream,
                    ContentType = file.ContentType,
                    // CannedACL = S3CannedACL.PublicRead  // Avoid public read, use pre-signed URLs instead
                };

                await _s3Client.PutObjectAsync(request);

                // Return only the key, NOT the full URL
                return fileName;
            }
            catch (Exception e)
            {
                throw new Exception($"Error uploading file: {e.Message}");
            }
        }

        public string GeneratePreSignedURL(string key, int expiryMinutes = 15)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Expires = DateTime.UtcNow.AddMinutes(expiryMinutes)
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
